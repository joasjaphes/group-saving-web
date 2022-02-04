import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Loan} from '../../../../store/loan/loan.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

@Component({
  selector: 'app-single-loan',
  templateUrl: './single-loan.component.html',
  styleUrls: ['./single-loan.component.scss']
})
export class SingleLoanComponent implements OnInit {

  @Input() group: Group;
  @Input() loan: Loan;

  @Input() showDelete = true;
  loading = false;
  @Output() closeForm = new EventEmitter();
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
      this.onCLose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Loan was not deleted successful');
      console.error(e);
    }
  }

  onCLose() {
    this.closeForm.emit();
  }

}
