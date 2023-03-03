import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonService } from 'src/app/services/common.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { ApplicationState } from 'src/app/store';
import { Group } from 'src/app/store/group/group.model';
import { Member } from 'src/app/store/member/member.model';

@Component({
  selector: 'app-update-member-password',
  templateUrl: './update-member-password.component.html',
  styleUrls: ['./update-member-password.component.scss'],
  animations: [fadeIn],
})
export class UpdateMemberPasswordComponent implements OnInit {
  @Input() group: Group;
  @Input() memberName: string;
  @Input() member: Member;
  @Input() members: Member[];
  @Output() closeForm = new EventEmitter();

  loading = false;

  passWord: string;
  confirmPassword: string;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.closeForm.emit();
  }

  async save() {
    this.loading = true;
    try {
      const dataToSave = {
        memberId: this.member.id,
        phoneNumber: this.member.phone_number,
        password: this.passWord,
      };
      await this.functionsService.saveData('updatePassword', dataToSave);
      this.commonService.showSuccess('Members password updated successful');
      this.closeDialog();
    } catch (e) {
      console.error(e);
      this.commonService.showError('Failed to update password');
    }
    this.loading = false;
  }
}
