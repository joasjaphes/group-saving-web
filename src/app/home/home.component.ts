import {Component, OnInit} from '@angular/core';
import {routeAnimations} from '../shared/animations/router-animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimations]
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {}

}
