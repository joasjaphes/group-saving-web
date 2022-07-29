import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';
import {countries, Country} from '../../../store/countries';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {trimPhoneNumber} from '../../../store/login-steps/login-steps.selectors';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-update-member-phone',
  templateUrl: './update-member-phone.component.html',
  styleUrls: ['./update-member-phone.component.scss'],
  animations: [fadeIn]
})
export class UpdateMemberPhoneComponent implements OnInit {
  @Input() group: Group;
  @Input() memberName: string;
  @Input() member: Member;
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
    if (this.member) {
      this.phoneNumber = this.member.phone_number.substr(this.member.phone_number.length - 9);
    }
  }

  setPhoneCountry(event) {
    this.country = this.countries.find(i => i.phoneCode === event.value);
    this.selectedCountry = this.country.phoneCode;
  }

  get phoneIsValid() {
    const phone = `+${this.country.phoneCode}${trimPhoneNumber(this.phoneNumber)}`;
    const testRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return testRegex.test(phone);
  }

  setPhoneNumber(value) {
    const phone = `+${this.country.phoneCode}${trimPhoneNumber(this.phoneNumber)}`;
    if (phone !== this.member.phone_number) {
      const member = this.members.find(i => i.phone_number === phone);
      if (member) {
        this.numberTakenMember = member;
      } else {
        this.numberTakenMember = null;
      }
    }
  }

  closeDialog() {
    this.closeForm.emit();
  }

  async save() {
    const phoneNumber = `+${this.country.phoneCode}${trimPhoneNumber(this.phoneNumber)}`;
    const dataToSave = {
      memberId: this.member.id,
      name: this.name,
      updated_phone: phoneNumber,
      phoneNumber: this.member.phone_number,
      groupId: this.group.id,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('updatePhoneNumber', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Members phone number updated successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

}
