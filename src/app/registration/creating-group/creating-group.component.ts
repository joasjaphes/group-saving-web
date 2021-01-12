import { Component, OnInit } from '@angular/core';
import {fadeIn} from '../../shared/animations/router-animation';

@Component({
  selector: 'app-creating-group',
  templateUrl: './creating-group.component.html',
  styleUrls: ['./creating-group.component.scss'],
  animations: [fadeIn]
})
export class CreatingGroupComponent implements OnInit {

  showFirst = false;
  showSecond = false;
  showThird = false;
  showForth = false;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.showFirst = true, 100);
    setTimeout(() => this.showSecond = true, 1000);
    setTimeout(() => this.showThird = true, 2000);
    setTimeout(() => this.showForth = true, 3000);
  }

}
