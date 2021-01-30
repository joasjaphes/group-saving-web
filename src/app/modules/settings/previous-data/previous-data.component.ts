import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-previous-data',
  templateUrl: './previous-data.component.html',
  styleUrls: ['./previous-data.component.scss']
})
export class PreviousDataComponent implements OnInit {
  menus = [
    {
      name: 'Contribution By Member',
      route: '',
      description: 'Add past contribution for a specific member for many periods',
      image: 'contribution.png'
    },
    {
      name: 'Contribution By Period',
      route: '',
      description: 'Add all past contributions for a specific period for all members',
      image: 'contribution1.png'
    },
    {
      name: 'Loans',
      route: '',
      description: 'Add current active and past completed loans to members',
      image: 'request-money.png'
    },
  ];

  viewDetails = false;
  panelTitle = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  openPanel(title: any) {
    console.log(title);
    this.viewDetails = true;
    this.panelTitle = title.description;
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
  }

}
