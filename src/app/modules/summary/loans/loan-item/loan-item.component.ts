import {Component, Input, OnInit} from '@angular/core';
import {Loan} from '../../../../store/loan/loan.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {Group} from '../../../../store/group/group.model';

@Component({
  selector: 'app-loan-item',
  templateUrl: './loan-item.component.html',
  styleUrls: ['./loan-item.component.scss']
})
export class LoanItemComponent implements OnInit {

  @Input() loan: Loan;
  @Input() group: Group;
  @Input() showDelete = true;
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
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
