import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Back} from '../../store/router/router.action';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-registration-template',
  templateUrl: './registration-template.component.html',
  styleUrls: ['./registration-template.component.scss']
})
export class RegistrationTemplateComponent implements OnInit {
  @Input() progressValue: number;
  @Input() progressTitle = 'Progress';
  @Input() backTitle = 'Back';
  @Input() emitBack = false;
  @Output() back = new EventEmitter();
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
    if(this.emitBack) {
      this.back.emit()
    }else {
      this.store.dispatch(new Back());
    }
  }

}
