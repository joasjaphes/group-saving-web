import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {filter, first, map, mergeMap} from 'rxjs/operators';
import firebase from 'firebase';
import User = firebase.User;
import {Menu} from './menu.model';
import {ApplicationState} from '../store';
import {Store} from '@ngrx/store';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OfflineManagerService} from '../services/offline-manager.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {CommonService} from '../services/common.service';
import {FirestoreService} from '../services/firestore.service';
import {fadeIn, routeAnimations} from '../shared/animations/router-animation';
import {MatSidenav} from '@angular/material/sidenav';
import {DataKeys, GET_METHODS, UpdatedDataKeys} from '../store/data-keys';
import {LastUpdatedAt} from '../store/last-updated-at/last-updated-at.model';
import {getGroups, setSelectedGroup} from '../store/group/group.actions';
import {addCurrentUser} from '../store/user/user.actions';
import {setAnalyticsConfig} from '@angular/cli/models/analytics';
import {group} from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeIn, routeAnimations]
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  user$: Observable<User>;
  loading = false;
  active_route_string: any;
  titleSubscription: Subscription;
  menus: Menu[] = [
    {
      name: 'Home',
      route: '/home',
      icon: 'home',
    },
    {
      name: 'Members',
      route: '/members',
      icon: 'people_outline',
    },
    {
      name: 'My Account',
      route: '/my-account',
      icon: 'account_circle',
    },
    {
      name: 'Meetings',
      route: '/meeting',
      icon: 'group_work',
    },
    {
      name: 'More',
      route: '/more-information',
      icon: 'more_vert',
    },
    {
      name: 'Settings',
      route: '/settings',
      icon: 'settings',
    },
  ];

  isOpen = false;
  totalNotifications = 0;
  helpOpened$: Observable<boolean>;
  helpText$: Observable<string>;
  fetchData = true;
  userSubscription: Subscription;
  lastUpdatedSubscription: Subscription;
  memberGroupSubscription: Subscription;
  memberGroupSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<ApplicationState>,
    private userService: AuthService,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private location: Location,
    private afs: AngularFirestore,
    private offlineService: OfflineManagerService,
    private firestoreService: FirestoreService
  ) {
    this.user$ = this.userService.getLoginUser();
    this.helpOpened$ = this.commonService.showHElp1;
  }

  ngOnInit(): void {
    this.userSubscription = this.user$.subscribe((user) => {
      console.log({user});
      if (user) {
        this.store.dispatch(addCurrentUser({
            currentUser: {
              id: user.uid,
              name: user.displayName,
              phoneNumber: user.phoneNumber,
              photoUrl: user.photoURL,
              email: user.email
            }
          })
        );
        this.getMemberGroups(user.uid).then();
      }
    });
  }


  ngAfterViewInit() {
    // This code is used if I want to show loading during route changes
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadEnd) {
        const routes = this.location.path(true).split('/');
        if (routes.length > 0) {
          this.active_route_string = routes[routes.length - 1];
        }
      }
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.loading = false;
      }
    });
  }

  logout() {
    this.userService.logout().then();
  }

  check($event: boolean) {
  }


  closeHelp() {
    this.commonService.closeHelp();
  }

  async closeMenu(drawer: MatSidenav) {
    const isHandset = await this.isHandset$.pipe(first()).toPromise();
    if (isHandset) {
      await drawer.toggle();
    }
  }

  async getMemberGroups(userId: string) {
    this.getInitialDataFromLocal();
    const local_member_groups = await this.offlineService.getItems(DataKeys.MemberGroup).pipe(first()).toPromise();
    console.log({local_member_groups});
    if (local_member_groups && local_member_groups.length === 0) {
      this.memberGroupSub = this.afs
        .collection(DataKeys.MemberGroup, ref => ref.where('user_id', '==', userId))
        .valueChanges()
        .subscribe((member_groups: any) => {
          if (this.fetchData) {
            this.fetchData = false;
            this.initiateLastUpdatedTimes(member_groups);
            for (const mem of member_groups) {
              const activeGroup = localStorage.getItem('group_savings_active_group');
              if (activeGroup) {
                this.store.dispatch(setSelectedGroup({groupId: activeGroup}));
              } else {
                localStorage.setItem('group_savings_active_group', mem.group_id);
                this.store.dispatch(setSelectedGroup({groupId: mem.group_id}));
              }
              this.offlineService.saveItem({
                ...mem,
              }, DataKeys.MemberGroup).then();
            }
          }
        });
    } else {
      this.initiateLastUpdatedTimes(local_member_groups).then();
      const activeGroup = localStorage.getItem('group_savings_active_group');
      if (activeGroup) {
        this.store.dispatch(setSelectedGroup({groupId: activeGroup}));
      } else {
        const mem = local_member_groups[0];
        if (mem) {
          localStorage.setItem('group_savings_active_group', mem.group_id);
          this.store.dispatch(setSelectedGroup({groupId: mem.group_id}));
        }
      }
      console.log('Sasa hivi tunapita huku');
    }

  }

  // This method is used to initialize data from store if the user is logged in
  async initiateLastUpdatedTimes(member_groups: any) {
    const groups = member_groups ? member_groups : [];
    for (const group1 of groups) {
      console.log(group1);
      this.lastUpdatedSubscription = this.afs
        .collection('groups')
        .doc(group1.group_id)
        .collection('updated')
        .doc('others')
        .valueChanges()
        .subscribe(async (updateTimes: any) => {
          try {
            console.log({updateTimes}, '*******');
            // Get Last Updated Times from the local database
            const localTimes: LastUpdatedAt = await this.offlineService.getLastUpdatedTimes();
            console.log({localTimes});
            // get group Information
            console.log('calling the method....');
            await this.firestoreService.getUpdatedData(
              localTimes,
              updateTimes,
              DataKeys.Group,
              this.firestoreService.getGroupData,
              getGroups(),
              group1.group_id,
              UpdatedDataKeys[DataKeys.Group]
              );
            // get Other Information
            const keysToWorkWith = Object.keys(DataKeys)
              .map(i => DataKeys[i])
              .filter(i => i !== 'updated')
              .filter(i => i !== 'user')
              .filter(i => i !== DataKeys.MemberGroup)
              .filter(i => i !== 'groups');
            for (const storeKey of keysToWorkWith) {
              await this.firestoreService.getUpdatedData(
                localTimes,
                updateTimes,
                storeKey,
                this.firestoreService.getData,
                GET_METHODS[storeKey],
                group1.group_id,
                UpdatedDataKeys[storeKey]
              );
            }
            this.offlineService.saveLastUpdatedTimes({
              ...updateTimes,
              id: 'times'
            }).then();
          } catch (e) {
            console.error(e);
          }
        });
    }
  }

  getInitialDataFromLocal() {
    Object.keys(DataKeys)
      .map(i => DataKeys[i])
      .filter(i => i !== 'updated')
      .filter(i => i !== 'user')
      .forEach(
        storeKey => this.store.dispatch(GET_METHODS[storeKey])
      );
  }

  keepMembersGroupInSync(userId) {
    this.memberGroupSubscription = this.afs
      .collection(DataKeys.MemberGroup, ref => ref.where('user_id', '==', userId))
      .valueChanges()
      .subscribe((member_groups: any) => {
        for (const mem of member_groups) {
          this.offlineService.saveItem({
            ...mem,
          }, DataKeys.MemberGroup).then();
        }
      });
  }

  ngOnDestroy() {
    if (this.memberGroupSubscription) {
      this.memberGroupSubscription.unsubscribe();
    }
    if (this.lastUpdatedSubscription) {
      this.lastUpdatedSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.memberGroupSub) {
      this.memberGroupSub.unsubscribe();
    }
  }
}
