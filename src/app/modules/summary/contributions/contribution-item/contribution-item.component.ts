import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../store/payment/payment.model';
import {Group} from '../../../../store/group/group.model';

@Component({
  selector: 'app-contribution-item',
  templateUrl: './contribution-item.component.html',
  styleUrls: ['./contribution-item.component.scss']
})
export class ContributionItemComponent implements OnInit {

  @Input() payment: Payment;
  @Input() group: Group;
  constructor() { }

  ngOnInit(): void {
  }

}
