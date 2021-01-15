import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Group} from '../../../../store/group/group.model';

@Component({
  selector: 'app-group-progress-dialog',
  templateUrl: './group-progress-dialog.component.html',
  styleUrls: ['./group-progress-dialog.component.scss']
})
export class GroupProgressDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GroupProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      group: Group
    }
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
