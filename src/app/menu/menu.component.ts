import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {filter, map, mergeMap} from 'rxjs/operators';
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

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeIn, routeAnimations]
})
export class MenuComponent implements OnInit, AfterViewInit {
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
      route: '/products',
      icon: 'people_outline',
    },
    {
      name: 'My Account',
      route: '/product-category',
      icon: 'account_circle',
    },
    {
      name: 'Meetings',
      route: '/suppliers',
      icon: 'group_work',
    },
    {
      name: 'More',
      route: '/storage-room',
      icon: 'more_vert',
    },
    {
      name: 'Settings',
      route: '/other-seller',
      icon: 'settings',
    },
  ];

  isOpen = false;
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
    private fireStoreService: FirestoreService
  ) {
    this.user$ = this.userService.getLoginUser();
  }

  ngOnInit(): void {
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

    // This code is used to set title of the route as it appears in a route file
    this.titleSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route: any) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event: any) => this.titleService.setTitle(event.title));
  }

  logout() {
    this.userService.logout().then();
  }

  changePassword() {}

  viewProfile() {}

}
