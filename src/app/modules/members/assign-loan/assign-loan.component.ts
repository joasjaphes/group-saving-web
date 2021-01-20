import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Group} from '../../../store/group/group.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {FineType} from '../../../store/fine-type/fine-type.model';
import {Member} from '../../../store/member/member.model';
import {LoanType} from '../../../store/loan-type/loan-type.model';

@Component({
  selector: 'app-assign-loan',
  templateUrl: './assign-loan.component.html',
  styleUrls: ['./assign-loan.component.scss']
})
export class AssignLoanComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AssignLoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      group: Group;
      contributionTypes: ContributionType[];
      fineTypes: FineType[];
      loanTypes: LoanType[];
      member: Member;
    }
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
