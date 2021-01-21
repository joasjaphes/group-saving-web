import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';
import {FineType} from '../../../store/fine-type/fine-type.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-add-contribution',
  templateUrl: './add-contribution.component.html',
  styleUrls: ['./add-contribution.component.scss'],
  animations: [fadeIn]
})
export class AddContributionComponent implements OnInit {

  contributionSelected: any = {};
  contributionAmount: any = {};
  constructor(
    public dialogRef: MatDialogRef<AddContributionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      group: Group;
      contributionTypes: ContributionType[];
      fineTypes: FineType[];
      member: Member;
    }
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
