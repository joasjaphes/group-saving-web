import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as loanSelector from '../../../store/loan/loan.selectors';
import * as loanTypeSelector from '../../../store/loan-type/loan-type.selectors';
import {LoanType} from '../../../store/loan-type/loan-type.model';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.scss']
})
export class LoanSummaryComponent implements OnInit {

  @Input() group: Group;
  loanSummary$: Observable<{ totalOut: number, paid: number, unpaid: number, percent: number }>;
  loanTypes$: Observable<LoanType[]>;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.loanTypes$ = this.store.pipe(select(loanTypeSelector.selectAll));
    this.loanSummary$ = this.store.pipe(select(loanSelector.selectActiveLoansSummary));
  }

  ngOnInit(): void {
  }

}
