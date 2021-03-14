import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';
import {trimPhoneNumber} from '../../../store/login-steps/login-steps.selectors';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';

@Component({
  selector: 'app-update-member-basics',
  templateUrl: './update-member-basics.component.html',
  styleUrls: ['./update-member-basics.component.scss']
})
export class UpdateMemberBasicsComponent implements OnInit {
  @Input() group: Group;
  @Input() member: Member;
  @Input() memberName: string;
  @Input() members: Member[];
  @Output() closeForm = new EventEmitter();
  name: string;
  email: string;
  phone: string;
  oldEmail: string;
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>,
  ) { }

  ngOnInit(): void {
    if (this.member) {
      this.name = this.member.name;
      this.oldEmail = this.member.email;
      this.phone = this.member.phone_number;
      const phone = this.member.phone_number;
      if (this.oldEmail.indexOf(phone.substr(2, 7)) === -1) {
        this.email = this.oldEmail;
      }
    }
  }

  async save() {
    const dataToSave = {
      memberId: this.member.id,
      name: this.name,
      phoneNumber: this.member.phone_number,
      memberName: this.memberName,
      groupName: this.group.group_name,
      groupId: this.group.id,
      email: !!this.email ? this.email : this.oldEmail,
      emailChanged: this.email !== this.member.email
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('updateSingleMember', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Members information set successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  closeDialog() {
    this.closeForm.emit();
  }

}
