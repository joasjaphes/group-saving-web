import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss'],
  animations: [fadeIn]
})
export class EnterPasswordComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() email: string;
  @Input() memberName: string;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  password: string;

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log('Logging IN');
  }
}
