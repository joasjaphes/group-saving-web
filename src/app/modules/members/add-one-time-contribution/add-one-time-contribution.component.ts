import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {FineType} from '../../../store/fine-type/fine-type.model';
import {Member} from '../../../store/member/member.model';
import {fadeIn} from '../../../shared/animations/router-animation';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';

@Component({
  selector: 'app-add-one-time-contribution',
  templateUrl: './add-one-time-contribution.component.html',
  styleUrls: ['./add-one-time-contribution.component.css'],
  animations: [fadeIn],
})
export class AddOneTimeContributionComponent implements OnInit {

  @Input() group: Group;
  @Input() contributionTypes: ContributionType[];
  @Input() currentContribution: ContributionType;
  @Input() fineTypes: FineType[];
  @Input() member: Member;
  @Output() closeForm = new EventEmitter();
  contributionDate: any = new Date();
  paymentMode: string;
  amount: number;
  referenceNumber: string;
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.closeForm.emit();
  }

  async save() {
    this.loading = true;
    let dataToSave = {
      groupId: this.group.id,
      contributionId: this.currentContribution.id,
      memberId: this.member.id,
      amount: this.amount,
      date: this.commonService.formatDate(this.contributionDate),
      referenceNumber: this.referenceNumber,
      paymentMode: this.paymentMode,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('addOneTimeContribution', dataToSave);
      this.loading = false;
      this.commonService.showSuccess(this.currentContribution?.name + ' from ' + this.member.name + ' Submitted Successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contribution was not assigned successful');
      console.error(e);
    }
  }

}
