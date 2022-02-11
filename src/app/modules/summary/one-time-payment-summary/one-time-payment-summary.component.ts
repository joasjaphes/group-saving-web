import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Observable} from 'rxjs';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {OneTimePayment} from '../../../store/one-time-payment/one-time-payment.model';
import {selectOneTime} from '../../../store/contribution-type/contribution-type.selectors';
import * as fromPayment from '../../../store/one-time-payment/one-time-payment.selectors';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';
import {Group} from '../../../store/group/group.model';
import * as groupSelector from '../../../store/group/group.selectors';
import * as memberSelector from '../../../store/member/member.selectors';
import {Member} from '../../../store/member/member.model';

@Component({
  selector: 'app-one-time-payment-summary',
  templateUrl: './one-time-payment-summary.component.html',
  styleUrls: ['./one-time-payment-summary.component.scss']
})
export class OneTimePaymentSummaryComponent implements OnInit {
  @Input() enableDelete = false;
  contributionTypes$: Observable<ContributionType[]>;
  contributions$: Observable<OneTimePayment[]>;
  group$: Observable<Group>;
  member$: Observable<Member>;

  viewDetails = false;
  panelTitle = '';
  viewType = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.contributionTypes$ = this.store.pipe(select(fromPayment.selectSummary));
    this.contributions$ = this.store.pipe(select(fromPayment.selectDetailed));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.member$ = this.store.pipe(select(groupSelector.selectCurrentMember));
    this.member$.subscribe(console.log)
  }

  ngOnInit(): void {
  }


  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  viewMemberContributions(contr: ContributionType) {
    this.contributions$ = this.store.pipe(select(fromPayment.selectByContrId(contr.id)));
    this.viewDetails = true;
    this.panelTitle =  ' Contributions for ' + contr.name;
    this.viewType = 'view';
  }

}
