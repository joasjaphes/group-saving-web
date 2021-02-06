import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {Group} from '../../../../store/group/group.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Member} from '../../../../store/member/member.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  animations: [fadeIn],
})
export class AddExpenseComponent implements OnInit {
  @Input() group: Group;
  @Input() contributionTypes: ContributionType[];
  @Input() members: Member[];
  @Input() member?: Member;
  @Output() closeForm = new EventEmitter();

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
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      memberId: this.memberId,
      amount: this.amount,
      associated_account: this.contributionType,
      date: this.commonService.formatDate(this.expenseDate),
      reason: this.description,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('createExpense', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Expense added Successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Expense was not assigned successful');
      console.error(e);
    }
  }

  selectContributionType(value: any) {
    const contrType = this.contributionTypes.find(i => i.id === value);
    if (contrType && contrType.track_balance && this.group.contribution_balances) {
        this.balanceLimit = this.group.contribution_balances[value] || 0;
    }
  }

  selectMember(value: any) {
    const memberDetails = this.members.find(i => i.id === value);
    if (memberDetails) {
      this.memberName = memberDetails.name;
    }
  }

  closeDialog() {
    this.closeForm.emit();
  }

}
