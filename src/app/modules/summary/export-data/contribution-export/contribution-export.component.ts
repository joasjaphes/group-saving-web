import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {LoanType} from '../../../../store/loan-type/loan-type.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Observable, Subscription} from 'rxjs';
import {Loan} from '../../../../store/loan/loan.model';
import {CommonService} from '../../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {ExcelDownloadService} from '../../../../services/excel-download.service';
import * as contributionTypeSelector from '../../../../store/contribution-type/contribution-type.selectors';
import {MatSelectChange} from '@angular/material/select';
import {first} from 'rxjs/operators';
import {selectLoansActiveBetweenDates} from '../../../../store/loan/loan.selectors';
import {selectContributionMemberMonthSummary} from '../../../../store/payment/payment.selectors';

@Component({
  selector: 'app-contribution-export',
  templateUrl: './contribution-export.component.html',
  styleUrls: ['./contribution-export.component.scss'],
  animations: [fadeIn]
})
export class ContributionExportComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  type: string;
  loanType = 'All';
  contributionType = '';
  selectedLoanType: LoanType;
  selectedContributionType: ContributionType;
  months: { id: string, name: string }[] = [];
  memberData$: Observable<any[]>;
  contributionTypes$: Observable<ContributionType[]>;
  loanTypes$: Observable<LoanType[]>;
  dateReady = false;
  monthTotals = {};
  overAllTotals = 0;
  basicTotals = 0;
  interestTotals = 0;
  title = 'Summary';
  @ViewChild('dataTable') dataTable: ElementRef;
  showPhoneNumber = false;
  totalSubscription: Subscription;

  constructor(
    private commonService: CommonService,
    private store: Store<ApplicationState>,
    private excelService: ExcelDownloadService,
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectDetailed));
  }

  ngOnInit(): void {
  }

  async setContributionType($event: MatSelectChange) {
    const items = await this.contributionTypes$.pipe(first()).toPromise();
    if ($event.value === 'All') {
      this.selectedContributionType = null;
    } else {
      this.selectedContributionType = items.find(i => i.id === $event.value);
    }
  }

  calculateMonthTotal(memberData: any[]) {
    this.overAllTotals = 0;
    const monthTotals = {};
    for (const member of memberData) {
      this.overAllTotals += member.total;
    }
    for (const month of this.months) {
      monthTotals[month.id] = 0;
      for (const member of memberData) {
        if (member.memberMonth && member.memberMonth[month.id]) {
          monthTotals[month.id] += member.memberMonth[month.id];
        }
      }
    }
    this.monthTotals = monthTotals;
  }

  setTitle() {
    const contrName = this.selectedContributionType ? ' - ' + this.selectedContributionType.name : '';
    this.title = 'Contribution Summary ' + contrName;
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
    this.setTitle();
    this.memberData$ = this.store.pipe(select(selectContributionMemberMonthSummary(months, this.contributionType)));
    this.totalSubscription = this.memberData$.subscribe(i => this.calculateMonthTotal(i));

    this.dateReady = true;
  }

  downloadExcel() {
    this.excelService.download1('Contribution Summary',
      this.dataTable.nativeElement
    );
  }

  ngOnDestroy() {
    if (this.totalSubscription) {
      this.totalSubscription.unsubscribe();
    }
  }

  setStartMonth($event: { month: { name: string; id: string }; year: any }) {
    this.startDate = $event.year + '-' + $event.month.id + '-' + '01';
  }

  setEndMonth($event: { month: { name: string; id: string }; year: any }) {
    this.endDate = $event.year + '-' + $event.month.id + '-' + '01';
  }
}
