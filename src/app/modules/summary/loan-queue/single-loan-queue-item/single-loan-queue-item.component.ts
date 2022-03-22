import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoanQueue} from '../../../../store/loan-queue/loan-queue.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../../shared/animations/router-animation';
import {Group} from '../../../../store/group/group.model';
import {Loan} from '../../../../store/loan/loan.model';

@Component({
  selector: 'app-single-loan-queue-item',
  templateUrl: './single-loan-queue-item.component.html',
  styleUrls: ['./single-loan-queue-item.component.scss']
})
export class SingleLoanQueueItemComponent implements OnInit {

  @Input() loanQueue: LoanQueue;
  @Input() group: Group;
  @Input() showMenu: boolean = true;

  @Output() removeFromQueue = new EventEmitter<LoanQueue>();
  @Output() addLoan = new EventEmitter<LoanQueue>();

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor() { }

  ngOnInit(): void {
  }

  onRemoveFromQueue(loanQueue: LoanQueue) {
    this.removeFromQueue.emit(loanQueue);
  }

  onAddLoan(loanQueue: LoanQueue) {
    this.addLoan.emit(loanQueue);
  }

}
