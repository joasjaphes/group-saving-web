import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {GroupProgress} from '../../../../store/group/group-progress.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-starting-contribution-type',
  templateUrl: './starting-contribution-type.component.html',
  styleUrls: ['./starting-contribution-type.component.scss'],
  animations: [fadeIn]
})
export class StartingContributionTypeComponent implements OnInit {

  @Input() group: Group;
  @Input() progressDetails: GroupProgress;

  @Output() closeForm = new EventEmitter();

  contributionType: string;
  name: string;
  frequency: string;
  pricePerShare: any;
  isMandatory: string;
  isAmountSame: string;
  amount: any;
  minimumAmount: any;
  allowFine: string;
  allowLoan: string;
  fineCalculationType: string;
  fineAmount: any;
  fineName: string;
  loading;
  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    if (this.progressDetails) {
      this.contributionType = this.progressDetails.currentContributionType;
      this.name = this.progressDetails.contributionName;
    }
    if (this.group) {
      this.frequency = this.group.meeting_settings ? this.group.meeting_settings.meeting_frequency : '';
    }
  }

  setIsMandatory(value: any) {
    if (value === 'No') {
      this.isAmountSame = 'No';
      this.allowFine = 'No';
    }
  }

  async sendData() {
    const dataToSave = {
      groupId: this.group.id,
      name: this.name,
      frequency: this.frequency,
      amount: this.amount,
      valuePerShare: this.pricePerShare || 0,
      minimumAmount: this.minimumAmount,
      isMandatory: this.isMandatory,
      isOneTime: this.contributionType === 'Entry Fee' || this.contributionType === 'One Time',
      isFineAllowed: this.allowFine,
      contributionKey: this.contributionType,
      isAmountTheSame: this.isAmountSame,
      fineCalculationType: this.fineCalculationType,
      fineAmount: this.fineAmount,
      fineName: this.fineName,
      isLoanAllowed: this.allowLoan,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('createContributionType', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Contribution information successful');
      this.close();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  close() {
    this.closeForm.emit();
  }

  setAllowFine($event: MatSelectChange) {
    if ($event.value === 'Yes') {
      this.fineName = 'Late submission of ' + this.name;
    }
  }
}
