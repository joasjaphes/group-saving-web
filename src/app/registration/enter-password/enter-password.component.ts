import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss'],
  animations: [fadeIn]
})
export class EnterPasswordComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() email: string;
  @Input() memberName: string;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  password: string;

  @ViewChild('myInput') myInputField: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => this.myInputField.nativeElement.focus());
  }

  login() {
    console.log('Logging IN');
  }
}
