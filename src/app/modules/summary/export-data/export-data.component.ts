import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Observable} from 'rxjs';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import {LoanType} from '../../../store/loan-type/loan-type.model';
import * as loanTypeSelector from '../../../store/loan-type/loan-type.selectors';
import {fadeIn} from '../../../shared/animations/router-animation';
import {ExcelDownloadService} from '../../../services/excel-download.service';
import {Loan} from '../../../store/loan/loan.model';
import {MatSelectChange} from '@angular/material/select';
import {first} from 'rxjs/operators';
import {selectLoansActiveBetweenDates} from '../../../store/loan/loan.selectors';
import {selectContributionMemberMonthSummary} from '../../../store/payment/payment.selectors';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss'],
  animations: [fadeIn, trigger('slideShow', [
    transition(
      ':enter', [
        style({opacity: 0, transform: 'translateX(-100%)', position: 'absolute', top: '0px', width: '*'}),
        animate('500ms ease-out', style({opacity: 1, transform: 'translateX(0%)'}))
      ]
    ),
    transition(
      ':leave', [
        animate('500ms ease-out', style({opacity: 0, transform: 'translateX(100%)'}))
      ]
    ),
  ])]
})
export class ExportDataComponent implements OnInit {

  startDate;
  endDate;
  type: string;
  loanType = 'All';
  contributionType = 'All';
  selectedLoanType: LoanType;
  selectedContributionType: ContributionType;
  months: { id: string, name: string }[] = [];
  memberData$: Observable<any[]>;
  loanData$: Observable<Loan[]>;
  contributionTypes$: Observable<ContributionType[]>;
  loanTypes$: Observable<LoanType[]>;
  dateReady = false;
  monthTotals = {};
  loanMonthTotals = {};
  overAllTotals = 0;
  loanOverAllTotals = 0;
  basicTotals = 0;
  interestTotals = 0;
  title = 'Summary';
  summaryType = 'Contribution';
  @ViewChild('dataTable') dataTable: ElementRef;
  showPhoneNumber = false;

  constructor(
    private commonService: CommonService,
    private store: Store<ApplicationState>,
    private excelService: ExcelDownloadService,
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectDetailed));
    this.loanTypes$ = this.store.pipe(select(loanTypeSelector.selectDetailed));
  }

  ngOnInit(): void {
  }

  async setLoanType($event: MatSelectChange) {
    const loanTypes = await this.loanTypes$.pipe(first()).toPromise();
    if ($event.value === 'All') {
      this.selectedLoanType = null;
    } else {
      this.selectedLoanType = loanTypes.find(i => i.id === $event.value);
    }
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

  calculateLoanMonthTotal(memberData: Loan[]) {
    this.loanOverAllTotals = 0;
    this.basicTotals = 0;
    this.interestTotals = 0;
    const monthTotals = {};
    for (const member of memberData) {
      this.loanOverAllTotals += member.remaining_balance;
      this.basicTotals += member.amount_taken;
      this.interestTotals += member.total_profit_contribution;
    }
    for (const month of this.months) {
      monthTotals[month.id] = 0;
      for (const member of memberData) {
        if (member.monthData && member.monthData[month.id]) {
          monthTotals[month.id] += member.monthData[month.id];
        }
      }
    }
    this.loanMonthTotals = monthTotals;
  }

  setTitle() {
    if (this.type === 'Contribution') {
      const contrName = this.selectedContributionType ? ' - ' + this.selectedContributionType.name : '';
      this.title = 'Contribution Summary ' + contrName;
    } else if (this.type === 'Loan') {
      const loanName = this.selectedLoanType ? ' - ' + this.selectedLoanType.name : '';
      this.title = 'Loan Summary ' + loanName;
    }
  }

  getData() {
    const startDate = this.commonService.formatDate(this.startDate);
    const endDate = this.commonService.formatDate(this.endDate);
    const months = this.commonService.dateRange(startDate, endDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.months = this.commonService.dateRange(startDate, endDate).map(item => {
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
    this.loanData$ = this.store.pipe(select(selectLoansActiveBetweenDates(startDate, endDate, months, this.loanType)));
    this.loanData$.subscribe(i => this.calculateLoanMonthTotal(i));
    this.setTitle();
    this.memberData$ = this.store.pipe(select(selectContributionMemberMonthSummary(months, this.contributionType)));
    this.memberData$.subscribe(i => this.calculateMonthTotal(i));

    this.dateReady = true;
  }

  downloadExcel() {
    this.excelService.download1(
      this.type === 'Loan' ? 'Loan Summary' : 'Contribution Summary',
      this.dataTable.nativeElement
    );
  }
}
