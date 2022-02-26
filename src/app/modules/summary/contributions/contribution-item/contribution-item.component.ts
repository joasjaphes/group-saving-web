import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../store/payment/payment.model';
import {Group} from '../../../../store/group/group.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {GroupProgressDialogComponent} from '../../../../shared/components/group-progress/group-progress-dialog/group-progress-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ViewAttachmentComponent} from '../../../../shared/components/view-attachment/view-attachment.component';

@Component({
  selector: 'app-contribution-item',
  templateUrl: './contribution-item.component.html',
  styleUrls: ['./contribution-item.component.scss']
})
export class ContributionItemComponent implements OnInit {

  @Input() payment: Payment;
  @Input() group: Group;
  @Input() showDelete = false;
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  async deleteContributions() {
    const data = {
      groupId: this.group.id,
      payments: [{period: this.payment.period, memberId: this.payment.memberId, keys: this.payment.keys}]
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('deleteContribution', data);
      this.loading = false;
      this.commonService.showSuccess('Contributions deleted Successful');
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contributions was not deleted successful');
      console.error(e);
    }
  }

  viewReceipt() {
    const dialogRef = this.dialog.open(ViewAttachmentComponent, {
      minHeight: '60vh',
      data: {
        fileUrl: this.payment.fileUrl,
        title: this.payment.member.name,
        subtitle: this.payment.totalAmount,
        description: this.payment.description,
      },
      disableClose: true,
    });
  }
}
