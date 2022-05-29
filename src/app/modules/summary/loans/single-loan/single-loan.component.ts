import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Loan} from '../../../../store/loan/loan.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {Member} from '../../../../store/member/member.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import * as memberSelector from '../../../../store/member/member.selectors';
import {selectExceptMember} from '../../../../store/member/member.selectors';

@Component({
  selector: 'app-single-loan',
  templateUrl: './single-loan.component.html',
  styleUrls: ['./single-loan.component.scss'],
  animations: [fadeIn],
})
export class SingleLoanComponent implements OnInit {

  @Input() group: Group;
  @Input() loan: Loan;
  @Input() members: Member[] = [];

  @Input() showDelete = false;
  loading = false;
  addingGuarantors = false;
  showAddGuarantors = false;
  firstMemberId: string;
  secondMemberId: string;
  thirdMemberId: string;
  firstMemberSearch: string;
  secondMemberSearch: string;
  thirdMemberSearch: string;
  members$: Observable<Member[]>;
  @Output() closeForm = new EventEmitter();
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>,
    ) { }

  ngOnInit(): void {
    this.members$ = this.store.pipe(select(memberSelector.selectExceptMember(this.loan.member?.phone_number)));
    this.firstMemberId = this.loan.additional_config && this.loan.additional_config.firstMemberId;
    this.secondMemberId = this.loan.additional_config && this.loan.additional_config.secondMemberId;
    this.thirdMemberId = this.loan.additional_config && this.loan.additional_config.thirdMemberId;
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

  get showTwo(): boolean {
    const count = this.loan.loanType?.number_of_guarantee;
    return count == 'TWO' || count == 'THREE';
  }

  get showOne(): boolean {
    const count = this.loan.loanType?.number_of_guarantee;
    return count == 'ONE' || count == 'TWO' || count == 'THREE';
  }

  get showThree(): boolean {
    const count = this.loan.loanType?.number_of_guarantee;
    return count == 'THREE';
  }

  get showSave(): boolean {
    if (this.showThree) {
      return !!this.firstMemberId && !!this.secondMemberId && !!this.thirdMemberId;
    } else if (this.showTwo) {
      return !!this.firstMemberId && !!this.secondMemberId;
    } else if (this.showOne) {
      return !!this.firstMemberId;
    } else {
      return false;
    }
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
      this.onCLose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Loan was not deleted successful');
      console.error(e);
    }
  }

  async saveGuarantors() {
    const data = {
      groupId: this.group.id,
      memberId: this.loan.member_id,
      loanId: this.loan.id,
      firstMemberId: this.firstMemberId,
      secondMemberId: this.secondMemberId,
      thirdMemberId: this.thirdMemberId,
      remainingBalance: this.loan.remaining_balance,
    };
    this.addingGuarantors = true;
    this.showAddGuarantors = false;
    try {
      await this.functionsService.saveData('addLoanGuarantors', data);
      this.addingGuarantors = false;
      this.showAddGuarantors = false;
      this.commonService.showSuccess('Guarantors Added Successful');
      this.onCLose();
    } catch (e) {
      this.addingGuarantors = false;
      this.commonService.showError('Guarantors was not added successful');
      console.error(e);
    }
  }

  onCLose() {
    this.closeForm.emit();
  }

}
