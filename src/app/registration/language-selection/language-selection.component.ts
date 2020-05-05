import { Component, OnInit } from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {countries, Country} from '../../store/countries';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss'],
  animations: [fadeIn]
})
export class LanguageSelectionComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  countries = countries;
  selectedCountryId: string;
  selectedCountry: Country;
  constructor() { }

  ngOnInit(): void {
  }

  countrySelected($event) {
    this.selectedCountry = this.countries.find(i => i.phoneCode === $event);
  }

}
