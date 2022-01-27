import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from '../../../../store/member/member.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {MatSelectChange} from '@angular/material/select';
import {first} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CommonService} from '../../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import * as contributionTypeSelector from '../../../../store/contribution-type/contribution-type.selectors';
import {Dictionary} from '@ngrx/entity';
import {selectContributionMemberMonthSummary} from '../../../../store/payment/payment.selectors';

@Component({
  selector: 'app-import-contribution',
  templateUrl: './import-contribution.component.html',
  styleUrls: ['./import-contribution.component.css'],
  animations: [fadeIn]
})
export class ImportContributionComponent implements OnInit {
  @Input() members: Member[];
  @Input() contributionTypes: ContributionType[];
  @Input() group: Group;
  @Output() closeForm = new EventEmitter();
  contributionTypes$: Observable<Dictionary<ContributionType>>;

  startDate: any;
  endDate: any;
  contributionIds: string[] = [];
  selectedContributionTypes: ContributionType[] = [];
  months: { id: string, name: string }[] = [];
  constructor(
    private commonService: CommonService,
    private store: Store<ApplicationState>,
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectEntities));
  }

  ngOnInit(): void {
  }

  async setContributionType($event: MatSelectChange) {
    const items = await this.contributionTypes$.pipe(first()).toPromise();
    this.selectedContributionTypes = $event.value.map(i => items[i]);
  }

  setStartMonth($event: { month: { name: string; id: string }; year: any }) {
    this.startDate = $event.year + '-' + $event.month.id + '-' + '01';
  }

  setEndMonth($event: { month: { name: string; id: string }; year: any }) {
    this.endDate = $event.year + '-' + $event.month.id + '-' + '01';
  }

  getData() {
    const startDate = this.commonService.formatDate(this.startDate);
    const endDate = this.commonService.formatDate(this.endDate);
    const months = this.commonService.dateRange(startDate, endDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.months = months.map(item => {
      const date = item.split('-');
      const year = date[0];
      const mon = date[1];
      const key = `${year}${mon}`;
      const monthName = `${monthNames[new Date(item).getMonth()]} ${year}`;
      return {
        id: key,
        name: monthName
      };
    });
  }

}
