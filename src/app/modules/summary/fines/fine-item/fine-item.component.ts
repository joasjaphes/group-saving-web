import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Payment} from '../../../../store/payment/payment.model';

@Component({
  selector: 'app-fine-item',
  templateUrl: './fine-item.component.html',
  styleUrls: ['./fine-item.component.scss']
})
export class FineItemComponent implements OnInit {

  @Input() fine: Payment;
  @Input() group: Group;
  constructor() { }

  ngOnInit(): void {
  }

}
