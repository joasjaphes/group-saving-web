import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as loanSelector from '../../../store/loan/loan.selectors';
import * as loanTypeSelector from '../../../store/loan-type/loan-type.selectors';
import {LoanType} from '../../../store/loan-type/loan-type.model';
import {Member} from '../../../store/member/member.model';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.scss']
})
export class LoanSummaryComponent implements OnInit {

  @Input() group: Group;
  @Input() member: Member;
  @Input() showTitle = true;
  loanSummary$: Observable<{ totalOut: number, paid: number, unpaid: number, percent: number }>;
  loanTypes$: Observable<LoanType[]>;
  typeName = 'All';
  currentLoan = 'All';
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.loanTypes$ = this.store.pipe(select(loanTypeSelector.selectAll));
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const memberId = this.member ? this.member.id : 'All';
    this.loanSummary$ = this.store.pipe(select(loanSelector.selectActiveLoansSummary(this.currentLoan, memberId)));
  }
}
