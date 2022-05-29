import {Component, Input, OnInit} from '@angular/core';
import {Loan} from '../../../../store/loan/loan.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {Group} from '../../../../store/group/group.model';
import {Member} from '../../../../store/member/member.model';

@Component({
  selector: 'app-loan-item',
  templateUrl: './loan-item.component.html',
  styleUrls: ['./loan-item.component.scss']
})
export class LoanItemComponent implements OnInit {

  @Input() loan: Loan;
  @Input() group: Group;
  @Input() members: Member[] = [];
  @Input() showDelete = false;
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  get hasGuarantors(): boolean {
    const firstMemberId = this.loan.additional_config && this.loan.additional_config.firstMemberId;
    const secondMemberId = this.loan.additional_config && this.loan.additional_config.secondMemberId;
    const thirdMemberId = this.loan.additional_config && this.loan.additional_config.thirdMemberId;

    return !!firstMemberId || !!secondMemberId || !!thirdMemberId;
  }

  get guarantors(): string {
    const firstMemberId = this.loan.additional_config && this.loan.additional_config.firstMemberId;
    const secondMemberId = this.loan.additional_config && this.loan.additional_config.secondMemberId;
    const thirdMemberId = this.loan.additional_config && this.loan.additional_config.thirdMemberId;
    const arr = [firstMemberId, secondMemberId, thirdMemberId]
      .filter(i => !!i)
      .map(item => {
        const member = this.members.find(i => i.id == item);
        if (member) {
          return member.name + (member.subtitle ? '(' + member.subtitle + ')' : '');
        }
      })
    return arr.join(', ');
  }

  async deleteLoan() {
    const data = {
      groupId: this.group.id,
      memberId: this.loan.member_id,
      loanDetails: this.loan,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('deleteLoan', data);
      this.loading = false;
      this.commonService.showSuccess('Loan deleted Successful');
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Loan was not deleted successful');
      console.error(e);
    }
  }

}
