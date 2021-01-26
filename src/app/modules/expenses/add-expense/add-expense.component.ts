import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fadeIn} from '../../../shared/animations/router-animation';
import {Group} from '../../../store/group/group.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {Member} from '../../../store/member/member.model';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  animations: [fadeIn],
})
export class AddExpenseComponent implements OnInit {

  expenseFor: string;
  contributionType: string;
  expenseDate = new Date();
  memberId: string;
  description: string;
  amount: any;
  balanceLimit: any;
  memberName: any;
  loading = false;
  memberSearch = '';
  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    private commonService: CommonService,
    private functionsService: FunctionsService,
    @Inject(MAT_DIALOG_DATA) public data: {
      group: Group;
      contributionTypes: ContributionType[];
      members: Member[];
      member?: Member;
    }
  ) { }

  ngOnInit(): void {
  }

  async save() {
    const dataToSave = {
      groupId: this.data.group.id,
      memberId: this.memberId,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('assignLoanToMember', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Loan assigned to ' + this.data.member.name + ' Successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Loan was not assigned successful');
      console.error(e);
    }
  }

  selectContributionType(value: any) {
    const contrType = this.data.contributionTypes.find(i => i.id === value);
    if (contrType && contrType.track_balance && this.data.group.contribution_balances) {
        this.balanceLimit = this.data.group.contribution_balances[value] || 0;
    }
  }

  selectMember(value: any) {
    const memberDetails = this.data.members.find(i => i.id === value);
    if (memberDetails) {
      this.memberName = memberDetails.name;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
