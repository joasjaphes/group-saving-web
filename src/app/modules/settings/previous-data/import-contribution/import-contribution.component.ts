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
import {ExcelReaderService} from '../../../../services/excel-reader.service';
import {FunctionsService} from '../../../../services/functions.service';

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
  contributionIds: string;
  includeStartingShare = 'No';
  startingShareDate: any;
  selectedContributionTypes: ContributionType;
  months: { id: string, name: string }[] = [];
  fileUploadedName: string;
  loading = false;
  excelData = [];
  excelMonths = [];
  constructor(
    private commonService: CommonService,
    private store: Store<ApplicationState>,
    private excelService: ExcelReaderService,
    private functionsService: FunctionsService,
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectEntities));
  }

  ngOnInit(): void {
  }

  async setContributionType($event: MatSelectChange) {
    const items = await this.contributionTypes$.pipe(first()).toPromise();
    this.selectedContributionTypes = items[$event.value];
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
        this.excelData = Object.values(data)[0];
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
    let dataItems = [];
    for( const row of this.excelData) {
      const phoneNumber = row['Phone'];
      const member = this.members.find(i => i.phone_number === phoneNumber);
      Object.keys(row).forEach(key => {
        if (key === 'Phone' || key === 'Name') {}
        else if (key === 'Starting' && row[key] && this.startingShareDate && this.includeStartingShare === 'Yes') {
          const contribution = {
            groupId: this.group.id,
            memberId: member.id,
            amountTaken: row[key],
            loans: {},
            fines: {},
            contributions: {[this.contributionIds]: row[key]},
            date: this.startingShareDate,
            year: this.startingShareDate.substring(0, 4),
            month: this.startingShareDate.substring(5,7),
            period: `${this.startingShareDate.substring(0, 4)}${this.startingShareDate.substring(5,7)}`,
            isStarting: true,
            referenceNumber: '',
            paymentMode: '',
          };
          dataItems.push(contribution);
        }
        else {
          const splittedKey = key.split(' ');
          if (this.contributionIds && row[key] && splittedKey.length === 2 && monthNames[splittedKey[0]]) {
            const contribution = {
              groupId: this.group.id,
              memberId: member.id,
              amountTaken: row[key],
              loans: {},
              fines: {},
              startingAmount: {},
              contributions: {[this.contributionIds]: row[key]},
              date: `${splittedKey[1]}-${monthNames[splittedKey[0]]}-01`,
              year: splittedKey[1],
              month: monthNames[splittedKey[0]],
              period: `${splittedKey[1]}${monthNames[splittedKey[0]]}`,
              referenceNumber: '',
              paymentMode: '',
              isStarting: false,
            };
            dataItems.push(contribution);
          }
        }
      })
    }
    this.loading = true;
    this.members.forEach(member => {
      const startingFound = dataItems.find(i => i.memberId === member.id && i.isStarting);
      if (startingFound) {
        const monthData = dataItems.find(i => i.memberId === member.id && i.period === startingFound.period && !i.isStarting);
        if (monthData) {
          const monthAmount = parseFloat(monthData.contributions[this.contributionIds] + '');
          const startingAmount = parseFloat(startingFound.contributions[this.contributionIds] + '');
          const index = dataItems.findIndex(i => i.memberId === member.id && i.period === startingFound.period && !i.isStarting);
          dataItems[index] = {
            ...monthData,
            contributions: {[this.contributionIds]: monthAmount + startingAmount},
            startingAmount: {[this.contributionIds]: startingAmount},
          }
          dataItems = dataItems.filter(i => !(i.memberId === member.id && i.isStarting));
        }
      }
    });
    console.log(JSON.stringify(dataItems));
    try {
      await this.functionsService.saveData('addPastContributions', {
        groupId: this.group.id,
        membersData: dataItems
      });
      this.loading = false;
      this.commonService.showSuccess('Contributions Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contributions was not assigned successful');
      console.error(e);
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
    columns.push({name: 'Name', valueType: 'TEXT', key: 'name'}, {name: 'Phone', valueType: 'TEXT', key: 'phone'});
    if (this.includeStartingShare === 'Yes') {
      columns.push({name: 'Starting', valueType: 'TEXT', key: 'starting'});
    }
    this.months.forEach(month => columns.push({name: month.name, valueType: 'TEXT', key: month.id}));
    this.excelService.generateExcelTemplateWithData(
      columns,
      this.selectedContributionTypes.name,
      `${this.group.group_name} ${this.selectedContributionTypes.name} Contributions`,
      data
    )
  }
}
