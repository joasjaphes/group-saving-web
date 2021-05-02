import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoanType} from '../../../../store/loan-type/loan-type.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Observable} from 'rxjs';
import {Loan} from '../../../../store/loan/loan.model';
import {CommonService} from '../../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {ExcelDownloadService} from '../../../../services/excel-download.service';
import * as contributionTypeSelector from '../../../../store/contribution-type/contribution-type.selectors';
import * as loanTypeSelector from '../../../../store/loan-type/loan-type.selectors';
import {MatSelectChange} from '@angular/material/select';
import {first} from 'rxjs/operators';
import {selectLoansActiveBetweenDates} from '../../../../store/loan/loan.selectors';
import {selectContributionMemberMonthSummary} from '../../../../store/payment/payment.selectors';
import {fadeIn} from '../../../../shared/animations/router-animation';

@Component({
  selector: 'app-loan-export',
  templateUrl: './loan-export.component.html',
  styleUrls: ['./loan-export.component.scss'],
  animations: [fadeIn]
})
export class LoanExportComponent implements OnInit {

  startDate;
  endDate;
  type: string;
  loanType = '';
  selectedLoanType: LoanType;
  months: { id: string, name: string }[] = [];
  memberData$: Observable<any[]>;
  loanData$: Observable<Loan[]>;
  loanTypes$: Observable<LoanType[]>;
  dateReady = false;
  monthTotals = {};
  loanMonthTotals = {};
  overAllTotals = 0;
  loanOverAllTotals = 0;
  basicTotals = 0;
  interestTotals = 0;
  title = 'Summary';
  startPeriod = '';
  endPeriod = '';
  @ViewChild('dataTable') dataTable: ElementRef;
  showPhoneNumber = false;

  constructor(
    private commonService: CommonService,
    private store: Store<ApplicationState>,
    private excelService: ExcelDownloadService,
  ) {
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
    const loanName = this.selectedLoanType ? ' - ' + this.selectedLoanType.name : '';
    this.title = 'Loan Summary ' + loanName;
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
    this.loanData$ = this.store.pipe(select(selectLoansActiveBetweenDates(this.startPeriod, this.endPeriod, months, this.loanType)));
    this.loanData$.subscribe(i => this.calculateLoanMonthTotal(i));
    this.setTitle();
    this.dateReady = true;
  }

  setStartMonth($event: { month: { name: string; id: string }; year: any }) {
    this.startDate = $event.year + '-' + $event.month.id + '-' + '01';
    this.startPeriod = $event.year + '' + $event.month.id;
  }

  setEndMonth($event: { month: { name: string; id: string }; year: any }) {
    this.endDate = $event.year + '-' + $event.month.id + '-' + '01';
    this.endPeriod = $event.year + '' + $event.month.id;
  }

  downloadExcel() {
    this.excelService.download1(
      'Loan Summary', this.dataTable.nativeElement
    );
  }

}
