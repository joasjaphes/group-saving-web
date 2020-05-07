import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {countries, Country} from '../../store/countries';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  countries = countries;
  selectedCountry: string;
  @Input() country: Country;
  @Output() nextStep = new EventEmitter();
  @Output() setPhoneNumber = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
