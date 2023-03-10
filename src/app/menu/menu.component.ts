import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, first, map, mergeMap } from 'rxjs/operators';
import firebase from 'firebase/compat';
import User = firebase.User;
import { Menu } from './menu.model';
import { ApplicationState } from '../store';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  Router,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OfflineManagerService } from '../services/offline-manager.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonService } from '../services/common.service';
import { FirestoreService } from '../services/firestore.service';
import { fadeIn, routeAnimations } from '../shared/animations/router-animation';
import { MatSidenav } from '@angular/material/sidenav';
import { DataKeys, GET_METHODS, UpdatedDataKeys } from '../store/data-keys';
import { LastUpdatedAt } from '../store/last-updated-at/last-updated-at.model';
import { getGroups, setSelectedGroup } from '../store/group/group.actions';
import {
  addCurrentUser,
  logout,
  setSelectedGroupId,
} from '../store/user/user.actions';
import { Group } from '../store/group/group.model';
import * as groupSelector from '../store/group/group.selectors';
import { setSelectedMember } from '../store/member/member.actions';
import { GroupProgressDialogComponent } from '../shared/components/group-progress/group-progress-dialog/group-progress-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SwitchGroupsComponent } from './switch-groups/switch-groups.component';
import { getLastUpdatedAts } from '../store/last-updated-at/last-updated-at.actions';
import { getMemberGroups } from '../store/member-group/member-group.actions';
import { setNextStep } from '../store/login-steps/login-steps.actions';
import { RegistrationSteps } from '../registration/registration-steps';
import { Go } from '../store/router/router.action';
import { selectPhoneCountry } from '../store/login-steps/login-steps.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeIn, routeAnimations],
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
      name: 'Summary',
      route: '/summary',
      icon: 'list',
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
  group$: Observable<Group>;

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
    private firestoreService: FirestoreService,
    public dialog: MatDialog
  ) {
    this.user$ = this.userService.getLoginUser();
    this.helpOpened$ = this.commonService.showHElp1;
    this.group$ = this.store.pipe(select(groupSelector.selected));
  }

  ngOnInit(): void {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.store.dispatch(
          addCurrentUser({
            currentUser: {
              id: user.uid,
              name: user.displayName,
              phoneNumber: user.phoneNumber,
              photoUrl: user.photoURL,
              email: user.email,
            },
          })
        );
        this.getMemberGroups(user.uid).then();
        this.keepMembersGroupInSync(user.uid);
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

  async logout() {
    console.log('Loging out');
    // this action will clear the store data first before logging user out
    // TODO: make sure user cannot logout if there is no network
    this.store.dispatch(logout());
    const countryCode = localStorage.getItem('group-saving-country-code');
    if (countryCode) {
      this.store.dispatch(
        setNextStep({
          currentStep: RegistrationSteps.PhoneNumber,
          previousStep: RegistrationSteps.CountrySelection,
        })
      );
      this.store.dispatch(new Go({ path: ['', 'welcome', 'registration'] }));
    }
    this.userService.logout().then();
  }

  check($event: boolean) {}

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
    const activeGroup = localStorage.getItem('group_savings_active_group');
    this.getInitialDataFromLocal();
    const local_member_groups = await this.offlineService
      .getItems(DataKeys.MemberGroup)
      .pipe(first())
      .toPromise();
    if (local_member_groups && local_member_groups.length === 0) {
      this.memberGroupSub = this.afs
        .collection(DataKeys.MemberGroup, (ref) =>
          ref.where('user_id', '==', userId)
        )
        .valueChanges()
        .subscribe((member_groups: any) => {
          if (this.fetchData) {
            this.fetchData = false;
            this.initiateLastUpdatedTimes(member_groups);
            if (!activeGroup && member_groups.length > 1) {
              this.openSwitchGroups(true);
            } else {
              const mem = member_groups[0];
              this.setActiveGroupAndMember(mem);
              this.offlineService
                .saveItem(
                  {
                    ...mem,
                  },
                  DataKeys.MemberGroup
                )
                .then();
            }
            // for (const mem of member_groups) {
            //   this.setActiveGroupAndMember(mem);
            //   this.offlineService
            //     .saveItem(
            //       {
            //         ...mem,
            //       },
            //       DataKeys.MemberGroup
            //     )
            //     .then();
            // }
          }
        });
    } else {
      this.initiateLastUpdatedTimes(local_member_groups).then();
      if (!activeGroup && local_member_groups.length > 1) {
        this.openSwitchGroups(true);
      } else {
        this.setActiveGroupAndMember(local_member_groups[0]);
      }
    }
  }

  setActiveGroupAndMember(memberGroup) {
    const activeGroup = localStorage.getItem('group_savings_active_group');
    const currentMember = localStorage.getItem('group_savings_current_member');
    if (activeGroup) {
      localStorage.getItem('group_savings_active_group');
      this.store.dispatch(setSelectedGroup({ groupId: activeGroup }));
      this.store.dispatch(setSelectedGroupId({ groupId: activeGroup }));
      this.store.dispatch(setSelectedMember({ memberId: currentMember }));
    } else {
      localStorage.setItem('group_savings_active_group', memberGroup.group_id);
      localStorage.setItem(
        'group_savings_current_member',
        memberGroup.member_id
      );
      this.store.dispatch(setSelectedGroup({ groupId: memberGroup.group_id }));
      this.store.dispatch(
        setSelectedGroupId({ groupId: memberGroup.group_id })
      );
      this.store.dispatch(
        setSelectedMember({ memberId: memberGroup.member_id })
      );
    }
  }

  // This method is used to initialize data from store if the user is logged in
  async initiateLastUpdatedTimes(member_groups: any) {
    const groups = member_groups ? member_groups : [];
    for (const group1 of groups) {
      this.lastUpdatedSubscription = this.afs
        .collection('groups')
        .doc(group1.group_id)
        .collection('updated')
        .doc('others')
        .valueChanges()
        .subscribe(async (updateTimes: any) => {
          try {
            // Get Last Updated Times from the local database
            const localTimes: LastUpdatedAt =
              await this.offlineService.getLastUpdatedTimes(group1.group_id);
            // const expenses =  await this.offlineService.getItems(DataKeys.Expense).toPromise();
            // console.log('expenses',JSON.stringify(expenses))
            // get group Information
            this.firestoreService
              .getUpdatedData(
                localTimes,
                updateTimes,
                DataKeys.Group,
                this.firestoreService.getGroupData,
                getGroups(),
                group1.group_id,
                UpdatedDataKeys[DataKeys.Group]
              )
              .then();
            // get Other Information
            const keysToWorkWith = Object.keys(DataKeys)
              .map((i) => DataKeys[i])
              .filter((i) => i !== 'updated')
              .filter((i) => i !== 'user')
              .filter((i) => i !== DataKeys.MemberGroup)
              .filter((i) => i !== DataKeys.LoanType)
              .filter((i) => i !== DataKeys.ContributionType)
              .filter((i) => i !== DataKeys.FineType)
              .filter((i) => i !== DataKeys.Fine)
              .filter((i) => i !== DataKeys.SharePeriods)
              .filter((i) => i !== 'groups');
            for (const storeKey of keysToWorkWith) {
              this.firestoreService
                .getUpdatedData(
                  localTimes,
                  updateTimes,
                  storeKey,
                  this.firestoreService.getData,
                  GET_METHODS[storeKey],
                  group1.group_id,
                  UpdatedDataKeys[storeKey]
                )
                .then();
            }

            // Investigate why id has to be times, what obout overwriting
            this.offlineService
              .saveLastUpdatedTimes({
                ...updateTimes,
                id: group1.group_id /*'times'*/,
              })
              .then(() => {
                this.store.dispatch(getMemberGroups());
              });
          } catch (e) {
            console.error(e);
          }
        });
    }
  }

  getInitialDataFromLocal() {
    Object.keys(DataKeys)
      .map((i) => DataKeys[i])
      .filter((i) => i !== 'updated')
      .filter((i) => i !== 'user')
      .filter((i) => i !== DataKeys.LoanType)
      .filter((i) => i !== DataKeys.ContributionType)
      .filter((i) => i !== DataKeys.FineType)
      .filter((i) => i !== DataKeys.Fine)
      .filter((i) => i !== DataKeys.SharePeriods)
      .forEach((storeKey) => this.store.dispatch(GET_METHODS[storeKey]));
  }

  keepMembersGroupInSync(userId) {
    this.memberGroupSubscription = this.afs
      .collection(DataKeys.MemberGroup, (ref) =>
        ref.where('user_id', '==', userId)
      )
      .valueChanges()
      .subscribe((member_groups: any) => {
        for (const mem of member_groups) {
          this.offlineService
            .saveItem(
              {
                ...mem,
              },
              DataKeys.MemberGroup
            )
            .then(() => {
              this.store.dispatch(getMemberGroups());
            });
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

  openSwitchGroups(selectGroup = false) {
    const dialogRef = this.dialog.open(SwitchGroupsComponent, {
      width: '60%',
      minHeight: '60vh',
      data: { selectGroup },
      disableClose: true,
    });
  }
}
