import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Payment} from '../../../../store/payment/payment.model';
import {Group} from '../../../../store/group/group.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

@Component({
  selector: 'app-list-contributions',
  templateUrl: './list-contributions.component.html',
  styleUrls: ['./list-contributions.component.scss']
})
export class ListContributionsComponent implements OnInit {

  @Input() contributions: Payment[];
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
      payments: this.contributions.map(i => ({period: i.period, memberId: i.memberId, keys: i.keys}))
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
