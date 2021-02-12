import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Loan} from '../../../../store/loan/loan.model';

@Component({
  selector: 'app-single-loan',
  templateUrl: './single-loan.component.html',
  styleUrls: ['./single-loan.component.scss']
})
export class SingleLoanComponent implements OnInit {

  @Input() group: Group;
  @Input() loan: Loan;

  @Output() closeForm = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onCLose() {
    this.closeForm.emit();
  }

}
