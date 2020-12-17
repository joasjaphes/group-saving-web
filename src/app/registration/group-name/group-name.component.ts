import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
export class GroupNameComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Input() groupName: string;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  name: string;
  @ViewChild('myInput') myInputField: ElementRef;
  constructor(
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
    this.name = this.groupName;
  }

  ngAfterViewInit() {
    // Set timeout is here to avoid expression has changed before checked error
    setTimeout(() => this.myInputField.nativeElement.focus());
  }

  setGroupName($event: any) {
    this.store.dispatch(setGroupName({groupName: $event.target.value}));
  }

  goNextStep() {
    this.nextStep.emit({
      currentStep: RegistrationSteps.SetPassword,
      previousStep: RegistrationSteps.GroupName
    });
  }
}
