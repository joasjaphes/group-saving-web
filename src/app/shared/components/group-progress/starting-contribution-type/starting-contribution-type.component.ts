import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {GroupProgress} from '../../../../store/group/group-progress.model';
import {fadeIn} from '../../../animations/router-animation';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {MatSelectChange} from '@angular/material/select';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {FineType} from '../../../../store/fine-type/fine-type.model';
import {Fine} from '../../../../store/fine/fine.model';
import {ContributionTypes} from '../../../../store/contribution-type/contribution-type.enum';

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
  @Input() fines: Fine[];

  @Output() closeForm = new EventEmitter();

  contributionType: string;
  name: string;
  frequency: string;
  pricePerShare: any;
  isMandatory: string;
  isAmountSame: string;
  isStartingShare: string;
  amount: any;
  minimumAmount: any;
  minimumStartingAmount: any;
  allowFine: string;
  allowLoan: string;
  fineCalculationType: string;
  fineAmount: any;
  fineName: string;
  trackBalance: string;
  loading;
  fineHasData =  false;
  contributionHasDeadline = 'Yes';
  contributionStartDate: any;
  contributionEndDate: any;
  contributionTypeEnums = ContributionTypes;
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
      this.minimumStartingAmount = this.currentContributionType.minimum_starting_share;
      this.isStartingShare = this.currentContributionType.is_starting_share ? 'Yes' : 'No';
      this.minimumAmount = this.currentContributionType.minimum_contribution;
      this.allowFine = this.currentContributionType.allow_late_fine ? 'Yes' : 'No';
      this.allowLoan = this.currentContributionType.allow_loan ? 'Yes' : 'No';
      this.trackBalance = this.currentContributionType.track_balance ? 'Yes' : 'No';
      this.contributionHasDeadline = this.currentContributionType.contribution_has_deadline ? 'Yes' : 'No';
      this.contributionStartDate = this.currentContributionType.contribution_start_date;
      this.contributionEndDate = this.currentContributionType.contribution_end_date;
      if (this.fineTypes) {
        const lateFine = this.fineTypes.find(i => i.type === 'Contribution' && i.contribution_type_id === this.currentContributionType.id);
        this.allowFine = !!lateFine ? 'Yes' : 'No';
        if (lateFine) {
          this.fineCalculationType = lateFine.calculation;
          this.fineAmount = lateFine.fixed_amount;
          this.fineName = lateFine.description;
          // check if the fine has data already
          if (this.fines) {
            this.fineHasData = this.fines.filter(i => i.fine_id === lateFine.id).length > 0;
          }
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
      id: this.currentContributionType ? this.currentContributionType.id : this.commonService.makeId(),
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
      isStartingShare: this.isStartingShare,
      minimumStartingShare: this.minimumStartingAmount,
      trackBalance: this.trackBalance,
      fineHasData: this.fineHasData,
      contributionHasDeadline: this.contributionHasDeadline,
      contributionStartDate: this.commonService.formatDate(this.contributionStartDate),
      contributionEndDate: this.commonService.formatDate(this.contributionEndDate),

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
    } else {
      this.fineName = '';
      this.fineCalculationType = '';
      this.fineAmount = null;
    }
  }

  setContributionType($event: MatSelectChange) {
    if ($event.value === this.contributionTypeEnums.OneTime) {
      this.frequency = 'Random';
      this.allowLoan = 'No';
      this.allowFine = 'No';
    }
  }
}
