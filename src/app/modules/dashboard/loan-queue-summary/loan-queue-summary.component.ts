import { Component, OnInit } from '@angular/core';
import {Go} from '../../../store/router/router.action';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';

@Component({
  selector: 'app-loan-queue-summary',
  templateUrl: './loan-queue-summary.component.html',
  styleUrls: ['./loan-queue-summary.component.scss']
})
export class LoanQueueSummaryComponent implements OnInit {

  constructor(
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
  }
  goToLoanQueue() {
    this.store.dispatch(new Go({path: ['', 'summary', 'loan-queue' ]}));
  }
}
