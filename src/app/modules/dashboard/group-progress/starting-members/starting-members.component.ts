import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {fadeIn, fadeOut} from '../../../../shared/animations/router-animation';
import {countries, Country} from 'src/app/store/countries';
import {trimPhoneNumber} from '../../../../store/login-steps/login-steps.selectors';

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

  setPhoneNumber(value) {
  }

  get phoneIsValid() {
    const phone = `+${this.country.phoneCode}${trimPhoneNumber(this.phoneNumber)}`;
    const testRegex = /^\+\d\d\d\d\d\d\d\d\d\d\d\d$/;
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
        };
      }),
      memberName: this.currentMemberName,
      groupName: this.group.group_name,
      groupId: this.group.id,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('createMembers', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Members information set successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  onClose() {
    this.closeForm.emit();
  }
}
