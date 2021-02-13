import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../store/group/group.model';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.scss']
})
export class LoanSummaryComponent implements OnInit {

  @Input() group: Group;
  constructor() { }

  ngOnInit(): void {
  }

}
