import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../store/payment/payment.model';
import {Group} from '../../../../store/group/group.model';

@Component({
  selector: 'app-list-fines',
  templateUrl: './list-fines.component.html',
  styleUrls: ['./list-fines.component.scss']
})
export class ListFinesComponent implements OnInit {
  @Input() contributions: Payment[];
  @Input() group: Group;
  constructor() { }

  ngOnInit(): void {
  }

}
