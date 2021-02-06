import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-empty-summary',
  templateUrl: './empty-summary.component.html',
  styleUrls: ['./empty-summary.component.scss']
})
export class EmptySummaryComponent implements OnInit {

  @Input() infoNotComplete = false;
  @Input() incompleteText = '';
  @Input() itemsExists = false;
  @Input() imageSrc = 'investments.jpg';
  @Input() title = 'No Information Posted';
  @Input() addTitle = 'Add Items';
  @Input() subTitle = 'You can add new information by clicking add bellow';
  @Output() addClicked = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.addClicked.emit();
  }

}
