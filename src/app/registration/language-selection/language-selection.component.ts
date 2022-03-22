import {Component, HostListener, OnInit} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {countries, Country} from '../../store/countries';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Go} from '../../store/router/router.action';

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
  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.goNextStep();
    }
  }
  constructor(
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
  }

  goNextStep() {
    this.store.dispatch(new Go({path: ['', 'phone-number']}));
  }

  countrySelected($event) {
    this.selectedCountry = this.countries.find(i => i.phoneCode === $event);
  }

}
