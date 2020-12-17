import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {countries, Country} from '../../store/countries';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';

@Component({
  selector: 'app-country-selection',
  templateUrl: './country-selection.component.html',
  styleUrls: ['./country-selection.component.scss'],
  animations: [fadeIn]
})
export class CountrySelectionComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  countries = countries;
  selectedCountryId: string;
  @Input() selectedCountry: Country;
  @Output() setSelectedCountry = new EventEmitter<Country>();
  @Output() nextStep = new EventEmitter<{currentStep: string, previousStep: string}>();
  constructor(
  ) { }

  ngOnInit(): void {
    if (this.selectedCountry) {
      this.selectedCountryId = this.selectedCountry.phoneCode;
    }
  }

  countrySelected($event) {
    const selectedCountry = this.countries.find(i => i.phoneCode === $event);
    this.setSelectedCountry.emit(selectedCountry);
  }

  goNextStep() {
    this.nextStep.emit({currentStep: 'Phone Number', previousStep: 'Country Selection'});
  }

}
