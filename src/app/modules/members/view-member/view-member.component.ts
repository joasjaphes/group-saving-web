import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import {selectDetailedGroupBySingleMember} from '../../../store/payment/payment.selectors';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {
  @Input() member: Member;
  @Input() group: Group;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  contributionTypes$: Observable<ContributionType[]>;
  payments$: Observable<any>;
  year: any = new Date().getFullYear();
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectRepeating));
  }

  ngOnInit(): void {
    this.payments$ = this.store.pipe(select(selectDetailedGroupBySingleMember(this.year, this.member.id)));
  }

}
