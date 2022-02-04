import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../store/payment/payment.model';
import {Group} from '../../../../store/group/group.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

@Component({
  selector: 'app-contribution-item',
  templateUrl: './contribution-item.component.html',
  styleUrls: ['./contribution-item.component.scss']
})
export class ContributionItemComponent implements OnInit {

  @Input() payment: Payment;
  @Input() group: Group;
  @Input() showDelete = false;
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  async deleteContributions() {
    const data = {
      groupId: this.group.id,
      payments: [{period: this.payment.period, memberId: this.payment.memberId, keys: this.payment.keys}]
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('deleteContribution', data);
      this.loading = false;
      this.commonService.showSuccess('Contributions deleted Successful');
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contributions was not deleted successful');
      console.error(e);
    }
  }

}
