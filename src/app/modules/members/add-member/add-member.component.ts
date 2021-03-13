import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {countries, Country} from '../../../store/countries';
import {trimPhoneNumber} from '../../../store/login-steps/login-steps.selectors';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Group} from '../../../store/group/group.model';
import {fadeIn} from '../../../shared/animations/router-animation';
import {Member} from '../../../store/member/member.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  animations: [fadeIn]
})
export class AddMemberComponent implements OnInit {
  @Input() group: Group;
  @Input() memberName: string;
  @Input() members: Member[];
  @Output() closeForm = new EventEmitter();

  countries = countries;
  selectedCountry: string;
  country: Country;
  phoneNumber: string;
  currentPhoneNumber: string;
  name: string;
  loading = false;
  numberTakenMember: Member;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>,
  ) { }

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

  setPhoneNumber(value) {
    const phone = `+${this.country.phoneCode}${trimPhoneNumber(this.phoneNumber)}`;
    const member = this.members.find(i => i.phone_number === phone);
    if (member) {
      this.numberTakenMember = member;
    } else {
      this.numberTakenMember = null;
    }
  }

  get phoneIsValid() {
    const phone = `+${this.country.phoneCode}${trimPhoneNumber(this.phoneNumber)}`;
    const testRegex = /^\+\d\d\d\d\d\d\d\d\d\d\d\d$/;
    return testRegex.test(phone);
  }

  closeDialog() {
    this.closeForm.emit();
  }

  async save() {
    const phoneNumber = `+${this.country.phoneCode}${trimPhoneNumber(this.phoneNumber)}`;
    const dataToSave = {
      name: this.name,
      phoneNumber,
      memberName: this.memberName,
      groupName: this.group.group_name,
      groupId: this.group.id,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('createSingleMember', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Members information set successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }
}
