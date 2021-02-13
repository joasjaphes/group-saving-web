import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../store/group/group.model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent implements OnInit {


  @Input() group: Group;
  @Input() amountTitle = '';
  @Input() amount;
  @Input() leftAmount = 0;
  @Input() icon = 'arrow_downward';
  @Input() iconClass = 'green';
  @Input() leftTitle = 0;
  @Input() rightTitle = 0;
  @Input() rightAmount = 0;
  @Input() justifyRight = false;
  constructor() { }

  ngOnInit(): void {
    const sum = parseFloat(this.leftAmount + '') + parseFloat(this.rightAmount + '')
  }

}
