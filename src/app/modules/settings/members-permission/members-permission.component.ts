import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn} from '../../../shared/animations/router-animation';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';
import {LoanType} from '../../../store/loan-type/loan-type.model';
import {FunctionsService} from '../../../services/functions.service';
import {CommonService} from '../../../services/common.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';

@Component({
  selector: 'app-members-permission',
  templateUrl: './members-permission.component.html',
  styleUrls: ['./members-permission.component.scss'],
  animations: [fadeIn]
})
export class MembersPermissionComponent implements OnInit {
  @Input() group: Group;
  @Input() members: Member[] = [];
  @Input() loanTypes: LoanType[] = [];
  @Output() closeForm = new EventEmitter();

  contributions: string[] = [];
  meetings: string[] = [];
  loanApproval: string[] = [];

  loading = false;
  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
    private store: Store<ApplicationState>,
  ) { }

  ngOnInit(): void {
    if (this.group) {
      if (this.group.member_permission) {
        this.contributions = this.group.member_permission.contributions;
        this.loanApproval = this.group.member_permission.loan_approval;
        this.meetings = this.group.member_permission.meetings;
      } else {
        if (this.group.chairperson) {
          this.contributions.push(this.group.chairperson);
          this.loanApproval.push(this.group.chairperson);
          this.meetings.push(this.group.chairperson);
        }
        if (this.group.secretary) {
          this.contributions.push(this.group.secretary);
          this.loanApproval.push(this.group.secretary);
          this.meetings.push(this.group.secretary);
        }
        if (this.group.treasure) {
          this.contributions.push(this.group.treasure);
          this.loanApproval.push(this.group.treasure);
          this.meetings.push(this.group.treasure);
        }
      }
    }
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      contributions: this.contributions,
      meetings: this.meetings,
      loan_approvals: this.loanApproval,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('setPermission', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Group Permission set successful');
      this.close();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  close() {
    this.closeForm.emit();
  }

}
