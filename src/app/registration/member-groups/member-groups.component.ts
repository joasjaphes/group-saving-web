import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemberGroup} from '../../store/member-group/member-group.model';
import {RegistrationSteps} from '../registration-steps';

@Component({
  selector: 'app-member-groups',
  templateUrl: './member-groups.component.html',
  styleUrls: ['./member-groups.component.scss']
})
export class MemberGroupsComponent implements OnInit {

  @Input() memberGroups: MemberGroup[];
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  constructor() { }

  ngOnInit(): void {
  }

  goNextStep() {
    this.nextStep.emit({
      currentStep: RegistrationSteps.MemberName,
      previousStep: RegistrationSteps.PhoneNumber
    });
  }

}
