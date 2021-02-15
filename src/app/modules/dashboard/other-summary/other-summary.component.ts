import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import {ApplicationState} from '../../../store';
import {Group} from '../../../store/group/group.model';

@Component({
  selector: 'app-other-summary',
  templateUrl: './other-summary.component.html',
  styleUrls: ['./other-summary.component.scss']
})
export class OtherSummaryComponent implements OnInit {

  years$: Observable<string[]>;
  @Input() group: Group;
  year = new Date().getFullYear();
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
  }

  ngOnInit(): void {
  }

  setYear(yr: string) {

  }
}
