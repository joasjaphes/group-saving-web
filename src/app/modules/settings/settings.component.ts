import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // Basic Group Information
  // Contribution Types
  // Loan Types
  // Leadership
  // Meeting Rules

  menus = [
    {
      name: 'Basic Group Information',
      route: '',
      description: 'Update Basic group information like contribution frequency, currency, name and other policy',
      image: ''
    },
    {
      name: 'Contribution Types',
      route: '',
      description: 'Set contribution types available for the group, Share, Social, Entry fees etc',
      image: ''
    },
    {
      name: 'Loan Types',
      route: '',
      description: 'Set loan configuration options, types of loan allowed, fines, profit contributions',
      image: ''
    },
    {
      name: 'Leadership',
      route: '',
      description: 'Select group leadership (Chairperson, Secretary and Treasure)',
      image: ''
    },
    {
      name: 'Meeting Rules',
      route: '',
      description: 'Set rules for meetings to be help by the group, frequency, late attendance fines, missing meeting fines etc',
      image: ''
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
