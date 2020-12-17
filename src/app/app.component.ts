import {AfterViewInit, Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {filter, map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {ApplicationState} from './store';
import {Go} from './store/router/router.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  constructor(
    updates: SwUpdate,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private afAuth: AngularFireAuth,
    private store: Store<ApplicationState>
  ) {
    this.afAuth.authState.subscribe(user => {
      // verify if user is authenticated and redirect
      if (user) {
        if (this.router.url === '/registration' || this.router.url === '/') {
          this.store.dispatch(new Go({path: ['dashboard']}));
        } else {
          this.store.dispatch(new Go({path: [this.router.url]}));
        }
      } else {
        if (this.router.url === '/registration') {
          this.store.dispatch(new Go({path: ['registration']}));
        } else {
          this.store.dispatch(new Go({path: ['']}));
        }
      }
    });
    // this will automatic fetch new update whenever available
    updates.available.subscribe(event => {
      // TODO: make sure you prompt user to agree to fetch updates
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

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
