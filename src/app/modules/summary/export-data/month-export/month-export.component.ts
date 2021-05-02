import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {Observable, Subscription} from 'rxjs';
import {CommonService} from '../../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {ExcelDownloadService} from '../../../../services/excel-download.service';
import * as contributionTypeSelector from '../../../../store/contribution-type/contribution-type.selectors';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {
  selectContributionAndLoanForSingleMonth,
} from '../../../../store/payment/payment.selectors';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-month-export',
  templateUrl: './month-export.component.html',
  styleUrls: ['./month-export.component.scss'],
  animations: [fadeIn]
})
export class MonthExportComponent implements OnInit {

  selectedMonth;
  @ViewChild('dataTable') dataTable: ElementRef;
  showPhoneNumber = false;
  totalSubscription: Subscription;
  memberData$: Observable<any[]>;
  contributionTypes$: Observable<ContributionType[]>;
  overAllTotals = 0;
  monthTotals = {};
  totalLoan = 0;
  dateReady = false;
  monthName = '';
  periodSelected: { month: { name: string; id: string }; year: any };
  constructor(
    private commonService: CommonService,
    private store: Store<ApplicationState>,
    private excelService: ExcelDownloadService,
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectDetailed));
  }

  ngOnInit(): void {
  }

  setMonth($event: { month: { name: string; id: string }; year: any }) {
    this.selectedMonth = `${$event.year}${$event.month.id}`;
    this.periodSelected = $event;
  }

  getData() {
    // selectContributionAndLoanForSingleMonth
    this.monthName = this.periodSelected.month.name + ' ' + this.periodSelected.year;
    this.memberData$ = this.store.pipe(select(selectContributionAndLoanForSingleMonth(this.selectedMonth)));
    this.totalSubscription = this.memberData$.subscribe(i => this.calculateMonthTotal(i));
    this.dateReady = true;
  }

  async calculateMonthTotal(memberData: any[]) {
    const contrTypes = await this.contributionTypes$.pipe(first()).toPromise();
    this.overAllTotals = 0;
    this.totalLoan = 0;
    const monthTotals = {};
    for (const member of memberData) {
      this.overAllTotals += member.total;
      this.totalLoan += parseFloat(member.loanPay);
    }
    for (const month of contrTypes) {
      monthTotals[month.id] = 0;
      for (const member of memberData) {
        if (member.memberMonth && member.memberMonth[month.id]) {
          monthTotals[month.id] += member.memberMonth[month.id];
        }
      }
    }
    this.monthTotals = monthTotals;
  }

  downloadExcel() {
    this.excelService.download1(
      'Contribution Summary',
      this.dataTable.nativeElement
    );
  }
}
