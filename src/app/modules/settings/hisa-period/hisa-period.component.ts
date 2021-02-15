import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-hisa-period',
  templateUrl: './hisa-period.component.html',
  styleUrls: ['./hisa-period.component.scss'],
  animations: [fadeIn]
})
export class HisaPeriodComponent implements OnInit {

  @Input() group: Group;
  @Output() closeForm = new EventEmitter();

  currentStartDate: any;
  distributionDate: any;
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
    if (this.group) {
      this.currentStartDate = this.group.share_start_date;
      this.distributionDate = this.group.share_end_date;
    }
  }

  onClose() {
    this.closeForm.emit();
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      startDate: this.commonService.formatDate(this.currentStartDate),
      endDate: this.commonService.formatDate(this.distributionDate),
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('setShareTimeline', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Share Period information Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Share period was not assigned successful');
      console.error(e);
    }
  }

}
