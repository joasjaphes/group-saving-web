import { Component, OnInit } from '@angular/core';
import {Go} from '../../../store/router/router.action';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Observable} from 'rxjs';
import {LoanQueue} from '../../../store/loan-queue/loan-queue.model';
import { selectNextInQueue} from '../../../store/loan-queue/loan-queue.selectors';
import {Group} from '../../../store/group/group.model';
import * as groupSelector from '../../../store/group/group.selectors';

@Component({
  selector: 'app-loan-queue-summary',
  templateUrl: './loan-queue-summary.component.html',
  styleUrls: ['./loan-queue-summary.component.scss']
})
export class LoanQueueSummaryComponent implements OnInit {

  nextInQueue$: Observable<LoanQueue>;
  group$: Observable<Group>;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.nextInQueue$ = this.store.pipe(select(selectNextInQueue));
    this.group$ = this.store.pipe(select(groupSelector.selected));
  }

  ngOnInit(): void {
  }
  goToLoanQueue() {
    this.store.dispatch(new Go({path: ['', 'summary', 'loan-queue' ]}));
  }
}
