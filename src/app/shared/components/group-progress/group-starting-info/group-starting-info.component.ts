import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {countries} from 'src/app/store/countries';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../animations/router-animation';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';

@Component({
  selector: 'app-group-starting-info',
  templateUrl: './group-starting-info.component.html',
  styleUrls: ['./group-starting-info.component.scss'],
  animations: [fadeIn]
})
export class GroupStartingInfoComponent implements OnInit {
  @Input() group: Group;
  @Input() editing = false;
  @Output() closeForm = new EventEmitter();
  countries = countries;
  currency;
  currencyName;
  meetingFrequency;
  trackContribution;
  shareChecked = false;
  socialChecked = false;
  entryChecked = false;
  otherChecked = false;
  entryFeeAmount;
  loading;

  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
    if (this.group) {
      this.currency = this.group.currency;
      this.currencyName = this.group.currency_name;
      this.meetingFrequency = this.group.meeting_settings ? this.group.meeting_settings.meeting_frequency : '';
      this.trackContribution = this.group.track_contribution_period ? 'Yes' : 'No';
    }
  }

  onChangeCurrency(value) {
    const selectedCurrency = this.countries.find(i => i.currency === value);
    if (selectedCurrency) {
      this.currencyName = selectedCurrency.currencyName;
    }
  }

  get durationTYpe() {
    switch (this.meetingFrequency) {
      case 'Monthly':
        return 'Month';
      case 'Weekly':
        return 'Week';
      default:
        return '';
    }
  }

  onClose() {
    this.closeForm.emit();
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      frequency: this.meetingFrequency,
      currency: this.currency,
      currency_name: this.currencyName,
      has_share: this.shareChecked,
      has_social: this.socialChecked,
      has_entry_fee: this.entryChecked,
      has_other_contribution: this.otherChecked,
      entry_fee_amount: this.entryFeeAmount,
      track_contribution_period: this.trackContribution,
    };
    this.loading = true;
    try {
      const response: any = await this.functionsService.saveData('setBasicInfo', dataToSave);
      console.log(JSON.stringify(response));
      this.loading = false;
      this.commonService.showSuccess('Group basic information set successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }

  }
}
