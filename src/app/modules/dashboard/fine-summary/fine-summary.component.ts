import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../../store/member/member.model';
import {Observable} from 'rxjs';
import {Group} from '../../../store/group/group.model';
import {select, Store} from '@ngrx/store';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import {ApplicationState} from '../../../store';
import {Go} from '../../../store/router/router.action';

@Component({
  selector: 'app-fine-summary',
  templateUrl: './fine-summary.component.html',
  styleUrls: ['./fine-summary.component.scss']
})
export class FineSummaryComponent implements OnInit {
  @Input() showTitle = true;
  @Input() member: Member;
  @Input() group: Group;
  group$: Observable<Group>;
  years$: Observable<string[]>;
  totalFinesPaid$: Observable<number>;
  year: any = new Date().getFullYear();
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
  }

  ngOnInit(): void {
    this.year = this.member ? 'All' : this.year;
    this.getData();
  }

  getData() {
    const memberId = this.member ? this.member.id : 'All';
    this.totalFinesPaid$ = this.store.pipe(select(paymentSelector.selectTotalFinePaymentByYear(this.year, 'All', memberId)));
    // this.totalContributionOnly$ = this.store.pipe(select(paymentSelector.selectTotalPaymentByYear(this.year, 'All', memberId)));
    // this.contributionTypes$ = this.store.pipe(select(paymentSelector.selectContributionTypeSummary(this.year)));
  }

  setYear(year: any) {
    this.year = year;
    this.getData();
  }
  goToFines() {
    this.store.dispatch(new Go({path: ['', 'summary', 'fines' ]}));
  }
}
