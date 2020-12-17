import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {setGroupName, setNextStep} from '../../store/login-steps/login-steps.actions';
import {RegistrationSteps} from '../registration-steps';

@Component({
  selector: 'app-group-name',
  templateUrl: './group-name.component.html',
  styleUrls: ['./group-name.component.scss'],
  animations: [fadeIn]
})
export class GroupNameComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Input() groupName: string;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  name: string;
  constructor(
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
    this.name = this.groupName;
  }

  setGroupName($event: any) {
    this.store.dispatch(setGroupName({groupName: $event.target.value}));
  }

  goNextStep() {
    this.nextStep.emit({currentStep: RegistrationSteps.GroupSize, previousStep: RegistrationSteps.GroupName});
  }
}
