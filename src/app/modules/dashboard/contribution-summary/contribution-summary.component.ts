import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../../store/member/member.model';
import {Observable} from 'rxjs';
import {Group} from '../../../store/group/group.model';
import {select, Store} from '@ngrx/store';
import * as groupSelector from '../../../store/group/group.selectors';
import {ApplicationState} from '../../../store';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import {fadeIn} from '../../../shared/animations/router-animation';
import {Go} from '../../../store/router/router.action';

@Component({
  selector: 'app-contribution-summary',
  templateUrl: './contribution-summary.component.html',
  styleUrls: ['./contribution-summary.component.scss'],
  animations: [fadeIn]
})
export class ContributionSummaryComponent implements OnInit {
  @Input() showTitle = true;
  @Input() member: Member;
  group$: Observable<Group>;
  totalContributionOnly$: Observable<number>;
  years$: Observable<string[]>;
  contributionTypes$: Observable<{name: string, total: number, id: string}[]>;
  year: any = new Date().getFullYear();
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
  }

  ngOnInit(): void {
    this.year = this.member ? 'All' : this.year;
    this.getData();
  }

  getData() {
    const memberId = this.member ? this.member.id : 'All';
    this.totalContributionOnly$ = this.store.pipe(select(paymentSelector.selectTotalPaymentByYear(this.year, 'All', memberId)));
    this.contributionTypes$ = this.store.pipe(select(paymentSelector.selectContributionTypeSummary(this.year, memberId)));
  }

  setYear(year: any) {
    this.year = year;
    this.getData();
  }

  goToContribution() {
    this.store.dispatch(new Go({path: ['', 'summary', 'contributions' ]}));
  }
}
