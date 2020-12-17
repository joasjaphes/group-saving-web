import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {setMemberName} from '../../store/login-steps/login-steps.actions';
import {MemberGroup} from '../../store/member-group/member-group.model';
import {RegistrationSteps} from '../registration-steps';

@Component({
  selector: 'app-member-name',
  templateUrl: './member-name.component.html',
  styleUrls: ['./member-name.component.scss'],
  animations: [fadeIn]
})
export class MemberNameComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Input() memberName: string;
  @Input() memberGroups: MemberGroup[] = [];
  @Output() nextStep = new EventEmitter<{ currentStep: string, previousStep: string }>();
  name: string;

  @ViewChild('myInput') myInputField: ElementRef;

  constructor(
    private store: Store<ApplicationState>
  ) {
  }

  ngOnInit(): void {
    if (this.memberName) {
      this.name = this.memberName;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.myInputField.nativeElement.focus());
  }

  goNextStep(step: string) {
    if (step === 'groupName') {
      this.nextStep.emit({
        currentStep: RegistrationSteps.GroupName,
        previousStep: RegistrationSteps.MemberName
      });
    }
    if (step === 'setPassword') {
      this.nextStep.emit({
        currentStep: RegistrationSteps.SetPassword,
        previousStep: RegistrationSteps.MemberName
      });
    }
  }

  setName($event: any) {
    this.store.dispatch(setMemberName({memberName: $event.target.value}));
  }
}
