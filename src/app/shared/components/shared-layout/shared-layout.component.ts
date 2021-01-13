import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {formSize, ROUTE_ANIMATIONS_ELEMENTS, tableSize} from '../../animations/router-animation';

@Component({
  selector: 'app-shared-layout',
  templateUrl: './shared-layout.component.html',
  styleUrls: ['./shared-layout.component.scss'],
  animations: [
    formSize, tableSize
  ]
})
export class SharedLayoutComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() loading = false;
  @Input() formTitle: string;
  @Input() addPermission: string[];
  @Input() helpText: string;
  @Input() showHelp = true;
  @Input() menus = [];

  @Input() viewDetails = false;
  @Input() hideAdd = true;
  @Input() addIcon = 'add';
  @Input() addText = 'Add';
  @Input() smallForm = true;
  @Input() hideBreadcrumb = false;

  @Output() addItem = new EventEmitter();
  @Output() closeDetails = new EventEmitter();
  @Input() animationSize: 'eighty' | 'sixty' | 'largeForm' | 'full' = 'sixty';
  @Input() image: any;
  @Input() icon: any;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor() { }

  ngOnInit() {
  }


  closeForm() {
    this.closeDetails.emit();
  }

  add() {
    this.addItem.emit();
  }

}
