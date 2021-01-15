import {Component, Input, OnInit} from '@angular/core';
import {countries} from 'src/app/store/countries';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../../shared/animations/router-animation';

@Component({
  selector: 'app-group-starting-info',
  templateUrl: './group-starting-info.component.html',
  styleUrls: ['./group-starting-info.component.scss'],
  animations: [fadeIn]
})
export class GroupStartingInfoComponent implements OnInit {
  @Input() group: Group;
  countries = countries;
  currency;
  currencyName;
  meetingFrequency;
  shareChecked = false;
  socialChecked = false;
  entryChecked = false;
  otherChecked = false;
  entryFeeAmount;

  constructor() {
  }

  ngOnInit(): void {
    if (this.group) {
      this.currency = this.group.currency;
      this.currencyName = this.group.currency_name;
      this.meetingFrequency = this.group.meeting_settings ? this.group.meeting_settings.meeting_frequency : '';
    }
  }

}
