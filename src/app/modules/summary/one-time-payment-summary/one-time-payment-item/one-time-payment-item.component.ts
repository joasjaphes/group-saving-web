import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../store/payment/payment.model';
import {Group} from '../../../../store/group/group.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {OneTimePayment} from '../../../../store/one-time-payment/one-time-payment.model';

@Component({
  selector: 'app-one-time-payment-item',
  templateUrl: './one-time-payment-item.component.html',
  styleUrls: ['./one-time-payment-item.component.scss']
})
export class OneTimePaymentItemComponent implements OnInit {
  @Input() payment: OneTimePayment;
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
      contributionId: this.payment.contributionId,
      memberId: this.payment.memberId
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('deleteOneTimeContribution', data);
      this.loading = false;
      this.commonService.showSuccess('Contributions deleted Successful');
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contributions was not deleted successful');
      console.error(e);
    }
  }

}
