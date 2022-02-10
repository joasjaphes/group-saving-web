import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {OneTimePayment} from '../../../../store/one-time-payment/one-time-payment.model';

@Component({
  selector: 'app-list-one-time-payment',
  templateUrl: './list-one-time-payment.component.html',
  styleUrls: ['./list-one-time-payment.component.css']
})
export class ListOneTimePaymentComponent implements OnInit {

  @Input() contributions: OneTimePayment[];
  @Input() group: Group;
  @Input() showDelete = false;

  @Output() closeForm = new EventEmitter();

  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) {
  }

  ngOnInit(): void {
  }

  async deleteContributions() {
    const data = {
      groupId: this.group.id,
      // payments: this.contributions.map(i => ({period: i.period, memberId: i.memberId, keys: i.keys}))
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('deleteContribution', data);
      this.loading = false;
      this.commonService.showSuccess('Contributions deleted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contributions was not deleted successful');
      console.error(e);
    }
  }

  onClose() {
    this.closeForm.emit();
  }
}
