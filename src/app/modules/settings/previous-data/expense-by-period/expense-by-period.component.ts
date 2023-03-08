import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { Group } from 'src/app/store/group/group.model';

@Component({
  selector: 'app-expense-by-period',
  templateUrl: './expense-by-period.component.html',
  styleUrls: ['./expense-by-period.component.scss'],
  animations: [fadeIn],
})
export class ExpenseByPeriodComponent implements OnInit {
  year: string;
  month: string;
  years = [];
  expenseFor = 'GROUP';
  memberSearch = '';
  memberId: string = '';
  memberName = '';
  amount = '';
  description = '';
  contributionType = '';
  @Input() members = [];
  @Input() contributionTypes = [];
  @Input() group: Group;
  loading = false;
  expenses = [];
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.generateYears();
  }

  setMonth(event) {}

  get addDisabled() {
    return (
      !this.expenseFor ||
      !this.contributionType ||
      !this.amount ||
      (this.expenseFor === 'MEMBER' && !this.memberId)
    );
  }

  generateYears() {
    this.years = [];
    const currentYear = new Date().getFullYear();
    for (let i = -5; i < 10; i++) {
      this.years.push(currentYear + i);
    }
  }

  selectMember(event) {}

  selectContributionType(event) {}

  save() {
    const currentExpense = {
      id: this.commonService.makeId(),
      groupId: this.group.id,
      groupName: this.group.group_name,
      memberId: this.memberId,
      memberName: this.memberName,
      amount: this.amount,
      associated_account: this.contributionType,
      date: this.commonService.formatDate(
        new Date(`${this.year}-${this.month}-01`)
      ),
      reason: this.description,
    };
  }

  closeDialog() {}
}
