import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  menus = [
    {
      name: 'Loans',
      route: ['', 'summary', 'loans'],
      description: 'View summary of loans by time and members',
      image: 'request-money.png'
    },
    {
      name: 'Contributions',
      route: ['', 'summary',  'contributions'],
      description: 'View summary of contributions by time and members',
      image: 'money.png'
    },
    {
      name: 'Fines',
      route: ['', 'summary',  'fines'],
      description: 'View summary of fines by time or members',
      image: 'fine.png'
    },
    {
      name: 'Loan Queue',
      route: ['', 'summary',  'loan-queue'],
      description: 'View list of members who are waiting to get loan',
      image: 'loan-queue.png'
    },
    {
      name: 'Expenses',
      route: ['', 'summary',  'expenses'],
      description: 'View summary of expenses by time or members',
      image: 'cash-in-hand.png'
    },
    {
      name: 'Adjustments',
      route: ['', 'summary',  'adjustments'],
      description: 'Summary of adjustments performed in accounts',
      image: 'adjustment.png'
    },
    {
      name: 'Cash Transfers',
      route: ['', 'summary', 'cash-transfers'],
      description: 'Summary of cash transfers from one account to another',
      image: 'money-transfer.png'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
