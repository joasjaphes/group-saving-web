import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../store/payment/payment.model';
import {Group} from '../../../../store/group/group.model';

@Component({
  selector: 'app-list-contributions',
  templateUrl: './list-contributions.component.html',
  styleUrls: ['./list-contributions.component.scss']
})
export class ListContributionsComponent implements OnInit {

  @Input() contributions: Payment[];
  @Input() group: Group;
  constructor() { }

  ngOnInit(): void {
  }

}
