import { Component, OnInit } from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  menus = [
    {
      name: 'Basic Group Information',
      route: '',
      description: 'Update Basic group information like contribution frequency, currency, name and other policy',
      image: 'adjustment.png'
    },
    {
      name: 'Contribution Types',
      route: '',
      description: 'Set contribution types available for the group, Share, Social, Entry fees etc',
      image: 'money.png'
    },
    {
      name: 'Loan Types',
      route: '',
      description: 'Set loan configuration options, types of loan allowed, fines, profit contributions',
      image: 'request-money.png'
    },
    {
      name: 'Leadership',
      route: '',
      description: 'Select group leadership (Chairperson, Secretary and Treasure)',
      image: 'leadership1.png'
    },
    {
      name: 'Meeting Rules',
      route: '',
      description: 'Set rules for meetings to be help by the group, frequency, late attendance fines, missing meeting fines etc',
      image: 'meeting.png'
    },
    {
      name: 'Add Previous Data',
      route: ['', 'settings', 'add-previous-data'],
      description: 'Add data that are missing and cannot be added one by one',
      image: 'past_data.png'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
