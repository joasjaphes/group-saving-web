import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {GroupProgress} from '../../../../store/group/group-progress.model';
import {fadeIn} from '../../../animations/router-animation';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {MatSelectChange} from '@angular/material/select';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {FineType} from '../../../../store/fine-type/fine-type.model';

@Component({
  selector: 'app-starting-contribution-type',
  templateUrl: './starting-contribution-type.component.html',
  styleUrls: ['./starting-contribution-type.component.scss'],
  animations: [fadeIn]
})
export class StartingContributionTypeComponent implements OnInit {

  @Input() group: Group;
  @Input() progressDetails: GroupProgress;
  @Input() editing = false;
  @Input() currentContributionType: ContributionType;
  @Input() fineTypes: FineType[];

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
  trackBalance: string;
  loading;
  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    if (this.progressDetails) {
      this.contributionType = this.progressDetails.currentContributionType;
      this.name = this.progressDetails.contributionName;
    } else if (this.currentContributionType) {
      this.contributionType = this.currentContributionType.type;
      this.name = this.currentContributionType.name;
      this.frequency = this.currentContributionType.collection_frequency;
      this.pricePerShare = this.currentContributionType.hisa_value;
      this.isMandatory = this.currentContributionType.is_must ? 'Yes' : 'No';
      this.isAmountSame = this.currentContributionType.is_fixed ? 'Yes' : 'No';
      this.amount = this.currentContributionType.fixed_value;
      this.minimumAmount = this.currentContributionType.minimum_contribution;
      this.allowFine = this.currentContributionType.allow_late_fine ? 'Yes' : 'No';
      this.allowLoan = this.currentContributionType.allow_loan ? 'Yes' : 'No';
      this.trackBalance = this.currentContributionType.track_balance ? 'Yes' : 'No';
      if (this.fineTypes) {
        const lateFine = this.fineTypes.find(i => i.type === 'Contribution' && i.contribution_type_id === this.currentContributionType.id);
        this.allowFine = !!lateFine ? 'Yes' : 'No';
        if (lateFine) {
          this.fineCalculationType = lateFine.calculation;
          this.fineAmount = lateFine.fixed_amount;
          this.fineName = lateFine.description;
        }
      }
    }
    if (this.group) {
      this.frequency = this.group.contribution_frequency;
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
      id: this.currentContributionType ? this.currentContributionType.id : this.commonService.makeid(),
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
      trackBalance: this.trackBalance,
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
