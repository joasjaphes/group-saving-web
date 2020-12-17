import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {RegistrationSteps} from '../registration-steps';
import {setGroupSize} from '../../store/login-steps/login-steps.actions';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';

@Component({
  selector: 'app-number-of-members',
  templateUrl: './number-of-members.component.html',
  styleUrls: ['./number-of-members.component.scss']
})
export class NumberOfMembersComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Input() numberOfMembers: number;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  membersNumber: number;
  numberList = [];
  numberSearch: string;
  constructor(
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
    this.membersNumber = this.numberOfMembers;
    this.setPossibleNumberOfMembers();
  }

  setPossibleNumberOfMembers() {
    for (let i = 3; i < 10000; i++ ) {
      this.numberList.push({id: i, value: i});
    }
  }

  setNumberOfMembers($event: any) {
    this.store.dispatch(setGroupSize({groupSize: $event.value}));
  }

  goNextStep() {
    this.nextStep.emit({currentStep: RegistrationSteps.GroupSize, previousStep: RegistrationSteps.GroupName});
  }
}
