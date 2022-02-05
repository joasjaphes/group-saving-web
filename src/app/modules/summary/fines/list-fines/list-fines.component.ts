import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Payment} from '../../../../store/payment/payment.model';
import {Group} from '../../../../store/group/group.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

@Component({
  selector: 'app-list-fines',
  templateUrl: './list-fines.component.html',
  styleUrls: ['./list-fines.component.scss']
})
export class ListFinesComponent implements OnInit {
  @Input() contributions: Payment[];
  @Input() group: Group;
  @Input() showDelete = true;

  @Output() closeForm = new EventEmitter();

  loading = false;
  loadingOne: {[id: string]: boolean} = {};
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  async deleteFines() {
    const data = {
      groupId: this.group.id,
      payments: this.contributions.map(i => ({period: i.period, memberId: i.memberId, keys: i.fineKeys}))
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('deleteContribution', data);
      this.loading = false;
      this.commonService.showSuccess('Fines deleted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Fines was not deleted successful');
      console.error(e);
    }
  }

  async deleteOneFine(fine: Payment) {
    const data = {
      groupId: this.group.id,
      payments: [{period: fine.period, memberId: fine.memberId, keys: fine.fineKeys}]
    };
    this.loadingOne[fine.id] = true;
    try {
      await this.functionsService.saveData('deleteContribution', data);
      this.loadingOne[fine.id] = false;
      this.commonService.showSuccess('Fine deleted Successful');
    } catch (e) {
      this.loadingOne[fine.id] = false;
      this.commonService.showError('Fine was not deleted successful');
      console.error(e);
    }
  }

  onClose() {
    this.closeForm.emit();
  }
}
