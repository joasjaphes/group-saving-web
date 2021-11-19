import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {filter, first, map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Store} from '@ngrx/store';
import {ApplicationState} from './store';
import {Go} from './store/router/router.action';
import {LastUpdatedAt} from './store/last-updated-at/last-updated-at.model';
import {DataKeys, GET_METHODS} from './store/data-keys';
import {getGroups} from './store/group/group.actions';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {OfflineManagerService} from './services/offline-manager.service';
import {FirestoreService} from './services/firestore.service';
import {addCurrentUser} from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  fetchData = true;
  title = 'kikoba-web';

  constructor(
    updates: SwUpdate,
    private afAuth: AngularFireAuth,
    private store: Store<ApplicationState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private afs: AngularFirestore,
    private offlineService: OfflineManagerService,
    private firestoreService: FirestoreService
  ) {
    this.afAuth.authState.subscribe(user => {
      // verify if user is authenticated and redirect
      if (user) {
        if (this.router.url === '/welcome/registration' || this.router.url === '/') {
          this.store.dispatch(new Go({path: ['']}));
        } else {
          this.store.dispatch(new Go({path: [this.router.url]}));
        }
      } else {
        if (this.router.url === '/welcome/registration') {
          this.store.dispatch(new Go({path: ['welcome', 'registration']}));
        } else {
          this.store.dispatch(new Go({path: ['welcome']}));
        }
      }
    }, (error) => {
      console.log(error);
    });
    // this will automatic fetch new update whenever available
    updates.available.subscribe(event => {
      // TODO: make sure you prompt user to agree to fetch updates
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit() {
  }

  // this was added to make sure that page titles will be different for every route
  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route: any) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => this.titleService.setTitle(event['title']));
  }

}
