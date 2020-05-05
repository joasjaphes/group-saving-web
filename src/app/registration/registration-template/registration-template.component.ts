import {Component, Input, OnInit} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Back} from '../../store/router/router.action';

@Component({
  selector: 'app-registration-template',
  templateUrl: './registration-template.component.html',
  styleUrls: ['./registration-template.component.scss']
})
export class RegistrationTemplateComponent implements OnInit {
  @Input() progressValue: number;
  @Input() progressTitle = 'Progress';
  @Input() backTitle = 'Back';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.store.dispatch(new Back());
  }

}
