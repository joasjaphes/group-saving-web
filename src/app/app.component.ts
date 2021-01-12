import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {filter, map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {ApplicationState} from './store';
import {Go} from './store/router/router.action';
import {LastUpdatedAt} from './store/last-updated-at/last-updated-at.model';
import {DataKeys, GET_METHODS} from './store/data-keys';
import {getGroups} from './store/group/group.actions';
import {AngularFirestore} from '@angular/fire/firestore';
import {OfflineManagerService} from './services/offline-manager.service';
import {FirestoreService} from './services/firestore.service';
import {addCurrentUser} from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

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
        this.initiateLastUpdatedTimes().then();
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
    });
    // this will automatic fetch new update whenever available
    updates.available.subscribe(event => {
      // TODO: make sure you prompt user to agree to fetch updates
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit() {}

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

  // This method is used to initialize data from store if the user is logged in
  async initiateLastUpdatedTimes() {
    this.afs
      .collection('last_updated').doc('times')
      .valueChanges()
      .subscribe(async (updateTimes: any) => {
        console.log({updateTimes});
        // Get Last Updated Times from the local database
        const localTimes: LastUpdatedAt = await this.offlineService.getLastUpdatedTimes();
        Object.keys(DataKeys)
          .map(i => DataKeys[i])
          .filter(i => i !== 'updated')
          .filter(i => i !== 'user')
          .forEach(storeKey => this.firestoreService.getUpdatedData(
            localTimes,
            updateTimes,
            storeKey,
            this.firestoreService.getData,
            GET_METHODS[storeKey]
          ))
        ;
        this.firestoreService.getUpdatedData(localTimes, updateTimes, DataKeys.Group, this.firestoreService.getData, getGroups());
        this.offlineService.saveLastUpdatedTimes({
          ...updateTimes,
          id: 'times'
        }).then();
      });
  }
}
