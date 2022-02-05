import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Payment} from '../../../../store/payment/payment.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

@Component({
  selector: 'app-fine-item',
  templateUrl: './fine-item.component.html',
  styleUrls: ['./fine-item.component.scss']
})
export class FineItemComponent implements OnInit {

  @Input() fine: Payment;
  @Input() group: Group;
  @Input() showDelete = true;
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
      payments: [{period: this.fine.period, memberId: this.fine.memberId, keys: this.fine.fineKeys}]
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('deleteContribution', data);
      this.loading = false;
      this.commonService.showSuccess('Fine deleted Successful');
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Fine was not deleted successful');
      console.error(e);
    }
  }

}
