import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {fadeIn, fadeOut} from '../../../animations/router-animation';
import {countries, Country} from 'src/app/store/countries';
import {trimPhoneNumber} from '../../../../store/login-steps/login-steps.selectors';
import {ExcelReaderService} from '../../../../services/excel-reader.service';
import * as Excel from 'exceljs';

@Component({
  selector: 'app-starting-members',
  templateUrl: './starting-members.component.html',
  styleUrls: ['./starting-members.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class StartingMembersComponent implements OnInit {
  @Input() group: Group;
  @Input() currentMemberName: string;
  @Output() closeForm = new EventEmitter();

  fileUploadedName: string;
  countries = countries;
  selectedCountry: string;
  country: Country;
  phoneNumber: string;
  currentPhoneNumber: string;
  memberName: string;
  members = [];
  loading = false;

  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
    private excelDownloadService: ExcelReaderService,
  ) {
  }

  ngOnInit(): void {
    if (this.group) {
      this.country = this.countries.find(i => i.isoCode === this.group.country);
      this.selectedCountry = this.country.phoneCode;
    }
  }
  setPhoneCountry(event) {
    this.country = this.countries.find(i => i.phoneCode === event.value);
    this.selectedCountry = this.country.phoneCode;
  }

  setPhoneNumber(event: any) {
  }

  get phoneIsValid() {
    return this.checkPhoneValidity(this.phoneNumber);
  }

  checkPhoneValidity(phoneNumber: any) {
    const phone = `+${this.country.phoneCode}${trimPhoneNumber(phoneNumber)}`;
    const testRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return testRegex.test(phone);
  }

  addMember() {
    this.members.push({
      phoneNumber: `+${this.country.phoneCode}${trimPhoneNumber(this.phoneNumber)}`,
      name: this.memberName
    });
    this.memberName = '';
    this.phoneNumber = '';

  }

  deleteMember(phone) {
    this.members = this.members.filter(i => i.phoneNumber !== phone);
  }

  async save() {
    const dataToSave = {
      members: this.members.map(member => {
        return {
          name: member.name,
          phoneNumber: member.phoneNumber,
          accounts: member.accounts ?? 1
        };
      }),
      memberName: this.currentMemberName,
      groupName: this.group.group_name,
      groupId: this.group.id,
    };
    this.loading = true;
    this.commonService.setIsLoading(true);
    try {
      await this.functionsService.saveData('createMembers', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Members information set successful');
      this.onClose();
    } catch (e) {

      this.commonService.setIsLoading(false);
      this.loading = false;
      console.error(e);
    }
  }

  onClose() {
    this.closeForm.emit();
  }

  downloadExcel() {
    const columns = [{
      name: 'Name',
      valueType: 'TEXT',
    }, {
      name: 'Phone Number (07XXXXXXXX)',
      valueType: 'TEXT',
    },
    ];
    this.excelDownloadService.generateExcelTemplate(columns, 'Sheet 1', this.group.group_name + '  Members for importation').then();
  }

  async onFileSelected(event) {
    const data = await this.excelDownloadService.getExcelData(event.target).subscribe(
      (data) => {
        const rows = Object.values(data)[0];
        for( const row of rows) {
          const dataInRow = Object.values(row);
          if (dataInRow[0] && dataInRow[1]) {
            const phoneNumber = `+${this.country.phoneCode}${trimPhoneNumber(dataInRow[1] + '')}`
            const member = this.members.find(i => i.phoneNumber === phoneNumber);
            if (!member && this.checkPhoneValidity(phoneNumber)) {
              this.members.push(
                {
                  phoneNumber: `+${this.country.phoneCode}${trimPhoneNumber(dataInRow[1] + '')}`,
                  name: dataInRow[0] + '',
                  accounts: dataInRow[2] ?? 1
                }
              )
            }

          }
          console.log(dataInRow);
        }
      }
    )
  }
}
