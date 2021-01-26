import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-infomation',
  templateUrl: './more-infomation.component.html',
  styleUrls: ['./more-infomation.component.scss']
})
export class MoreInfomationComponent implements OnInit {
  menus = [
    {
      name: 'Loans',
      route: '',
      description: 'View summary of loans by time and members',
      image: 'request-money.png'
    },
    {
      name: 'Contributions',
      route: '',
      description: 'View summary of contributions by time and members',
      image: 'money.png'
    },
    {
      name: 'Fines',
      route: '',
      description: 'View summary of fines by time or members',
      image: 'fine.png'
    },
    {
      name: 'Expenses',
      route: ['', 'expenses'],
      description: 'View summary of expenses by time or members',
      image: 'cash-in-hand.png'
    },
    {
      name: 'Adjustments',
      route: '',
      description: 'Summary of adjustments performed in accounts',
      image: 'adjustment.png'
    },
    {
      name: 'Cash Transfers',
      route: '',
      description: 'Summary of cash transfers from one account to another',
      image: 'meeting.png'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
