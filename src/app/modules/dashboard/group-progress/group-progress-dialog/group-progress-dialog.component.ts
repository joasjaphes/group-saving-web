import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Group} from '../../../../store/group/group.model';
import {GroupProgress} from '../../../../store/group/group-progress.model';
import {GroupProgressEnum} from '../../../../store/group/group-progress.enum';

@Component({
  selector: 'app-group-progress-dialog',
  templateUrl: './group-progress-dialog.component.html',
  styleUrls: ['./group-progress-dialog.component.scss']
})
export class GroupProgressDialogComponent implements OnInit {

  progressDetailsEnum = GroupProgressEnum;
  constructor(
    public dialogRef: MatDialogRef<GroupProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      group: Group,
      progressDetails: GroupProgress
    }
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}