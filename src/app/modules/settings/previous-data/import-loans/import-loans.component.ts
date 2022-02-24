import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {Member} from '../../../../store/member/member.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Group} from '../../../../store/group/group.model';
import {Observable} from 'rxjs';
import {Dictionary} from '@ngrx/entity';
import {CommonService} from '../../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {ExcelReaderService} from '../../../../services/excel-reader.service';
import {FunctionsService} from '../../../../services/functions.service';
import * as contributionTypeSelector from '../../../../store/contribution-type/contribution-type.selectors';
import * as loanTypeSelector from '../../../../store/loan-type/loan-type.selectors';
import {MatSelectChange} from '@angular/material/select';
import {first} from 'rxjs/operators';
import {LoanType} from '../../../../store/loan-type/loan-type.model';

@Component({
  selector: 'app-import-loans',
  templateUrl: './import-loans.component.html',
  styleUrls: ['./import-loans.component.css'],
  animations: [fadeIn]
})
export class ImportLoansComponent implements OnInit {
  @Input() members: Member[];
  @Input() contributionTypes: ContributionType[];
  @Input() loanTypes: LoanType[];
  @Input() group: Group;
  @Output() closeForm = new EventEmitter();
  contributionTypes$: Observable<Dictionary<ContributionType>>;
  loanTypes$: Observable<Dictionary<LoanType>>;

  startDate: any;
  endDate: any;
  contributionIds: string;
  includeStartingShare = 'No';
  startingShareDate: any;
  selectedLoanType: LoanType;
  selectedContributionTypes: ContributionType;
  months: { id: string, name: string }[] = [];
  fileUploadedName: string;
  loading = false;
  excelData = [];
  excelMonths = [];
  startDates: {[id: string]: any} = {};
  constructor(
    private commonService: CommonService,
    private store: Store<ApplicationState>,
    private excelService: ExcelReaderService,
    private functionService: FunctionsService,
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectEntities));
    this.loanTypes$ = this.store.pipe(select(loanTypeSelector.selectEntities));
  }

  ngOnInit(): void {
  }

  async setLoanType($event: MatSelectChange) {
    const items = await this.loanTypes$.pipe(first()).toPromise();
    this.selectedLoanType = items[$event.value];
  }

  setStartMonth($event: { month: { name: string; id: string }; year: any }) {
    this.startDate = $event.year + '-' + $event.month.id + '-' + '01';
  }

  setEndMonth($event: { month: { name: string; id: string }; year: any }) {
    this.endDate = $event.year + '-' + $event.month.id + '-' + '01';
  }

  setStartingShare($event: { month: { name: string; id: string }; year: any }) {
    this.startingShareDate = $event.year + '-' + $event.month.id + '-' + '01';
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

  async onFileSelected(event) {
    const monthNames = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06',
      'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    const data = this.excelService.getExcelData(event.target).subscribe(
      (data) => {
        this.excelData = Object.values(data)[0]
          .map(i => {
          return {
            ...i,
            start_date: !!i['Date Issued'] ? this.excelService.excelDateToJSDate(i['Date Issued']) : ''
          }
        });
        console.log(JSON.stringify(this.excelData))
        Object.keys(this.excelData[0]).forEach(key => {
          if (key === 'Phone' || key === 'Name') {} else {
            const splittedKey = key.split(' ');
            if (splittedKey.length === 2 && monthNames[splittedKey[0]]) {
              this.excelMonths.push({
                id: `${splittedKey[1]}${monthNames[splittedKey[0]]}`,
                name: key,
                year: splittedKey[1],
                month: monthNames[splittedKey[0]],
                monthName: splittedKey[0],
              })
            }

          }
        });

        this.excelMonths.sort((a, b) => a.id > b.id ? 1 : -1)

      }
    )
  }

  async saveData() {
    const monthNames = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06',
      'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    const loans = [];
    for( const row of this.excelData) {
      let payments = [];
      const phoneNumber = row['Phone'];
      const member = this.members.find(i => i.phone_number === phoneNumber);
      if (!!row['Date Issued'] && member) {
        Object.keys(row).forEach(key => {
          if (key === 'Phone' || key === 'Name') {}
          else {
            const splittedKey = key.split(' ');
            if (this.contributionIds && row[key] && splittedKey.length === 2 && monthNames[splittedKey[0]]) {
              const contribution = {
                id: this.commonService.makeId(),
                year: splittedKey[1],
                month: monthNames[splittedKey[0]],
                period: `${splittedKey[1]}${monthNames[splittedKey[0]]}`,
                week: '',
                date: `${splittedKey[1]}-${monthNames[splittedKey[0]]}-02`,
                memberId: member.id,
                amount: row[key],
              };
              payments.push(contribution);
            }
          }
        });
        const duration = row['Duration (Month)'];
        let balance = parseFloat(row['Amount + Interest'] + '')
        let total = 0;
        for (const payment of payments) {
          const amount = payment.amount + '';
          if (!!amount) {
            total += parseFloat(amount);
            payment.previous_balance = balance;
            payment.new_balance = parseFloat(row['Amount + Interest'] + '') - total;
            balance = parseFloat(row['Amount + Interest'] + '') - total;
          }
        }
        const loan = {
          id: this.commonService.makeId(),
          groupId: this.group.id,
          memberId: member.id,
          return_amount: row['Amount + Interest'],
          loanUsed: this.contributionIds,
          amountTaken: row['Amount'],
          duration,
          amount_per_return: parseFloat(row['Amount + Interest'] + '') / parseFloat(duration + ''),
          date: this.commonService.formatDate(row['start_date']),
          end_date: this.commonService.formatDate(this.setEndDate(row['start_date'], row['Duration (Month)'])),
          total_profit_contribution: parseFloat(row['Amount + Interest'] + '') - parseFloat(row['Amount'] + ''),
          remaining_balance: row['Outstanding'],
          amount_returned: parseFloat(row['Amount + Interest'] + '') - parseFloat(row['Outstanding'] + ''),
          last_return_date: this.commonService.formatDate(payments[payments.length - 1].date),
          payments: payments
        }
        loans.push(loan);
      }
    }
    console.log(JSON.stringify({
      groupId: this.group.id,
      loans
    }));
    this.loading = true;
    try {
      await this.functionService.saveData('importLoanFromExcel', {
        groupId: this.group.id,
        loans
      });
      this.loading = false;
      this.commonService.showSuccess('Loans Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Loans was not assigned successful');
      console.error(e);
    }
  }

  setEndDate(date: any, duration: number): any {
    if (this.selectedLoanType.duration_type === 'Monthly') {
      const d = new Date(date);
      d.setMonth(d.getMonth() + duration);
      return d;
    }
    if (this.selectedLoanType.duration_type === 'Weekly') {
      const d = new Date(date);
      d.setMonth(d.getDate() + (duration * 7));
      return d;
    } else {
      const d = new Date(date);
      d.setMonth(d.getMonth() + duration);
      return d;
    }
  }

  onClose() {
    this.closeForm.emit();
  }

  downloadData() {
    const columns: {name: string, valueType: string, key: string}[] = [];
    const data = [];
    this.members.forEach((member) => {
      const item: any = {};
      item.name = member.name;
      item.phone = member.phone_number;
      this.months.forEach(month => {
        item[month.id] = '';
      });
      data.push(item);
    });
    columns.push(
      {name: 'Name', valueType: 'TEXT', key: 'name'},
      {name: 'Phone', valueType: 'TEXT', key: 'phone'},
      {name: 'Date Issued', valueType: 'TEXT', key: 'date_issued'},
      {name: 'Amount', valueType: 'TEXT', key: 'amount'},
      {name: 'Duration (Month)', valueType: 'TEXT', key: 'duration'},
      {name: 'Amount + Interest', valueType: 'TEXT', key: 'amount_interest'},
      {name: 'Outstanding', valueType: 'TEXT', key: 'outstanding'},
    );
    this.months.forEach(month => columns.push({name: month.name, valueType: 'TEXT', key: month.id}));
    this.excelService.generateExcelTemplateWithData(
      columns,
      this.selectedLoanType.name,
      `${this.group.group_name} ${this.selectedLoanType.name} Loans`,
      data
    )
  }
}
