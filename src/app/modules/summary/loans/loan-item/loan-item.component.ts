import {Component, Input, OnInit} from '@angular/core';
import {Loan} from '../../../../store/loan/loan.model';

@Component({
  selector: 'app-loan-item',
  templateUrl: './loan-item.component.html',
  styleUrls: ['./loan-item.component.scss']
})
export class LoanItemComponent implements OnInit {

  @Input() loan: Loan;
  constructor() { }

  ngOnInit(): void {
  }

}
