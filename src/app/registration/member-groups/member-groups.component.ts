import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {MemberGroup} from '../../store/member-group/member-group.model';
import {RegistrationSteps} from '../registration-steps';

@Component({
  selector: 'app-member-groups',
  templateUrl: './member-groups.component.html',
  styleUrls: ['./member-groups.component.scss']
})
export class MemberGroupsComponent implements OnInit {

  @Input() memberGroups: MemberGroup[];
  @Input() memberName: string;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.goNextStep();
    }
  }
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
