import {AfterViewInit, Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {filter, map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

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
    private titleService: Title
  ) {
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
