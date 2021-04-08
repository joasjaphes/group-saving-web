import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-summary-model',
  templateUrl: './summary-model.component.html',
  styleUrls: ['./summary-model.component.scss']
})
export class SummaryModelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SummaryModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      type: string;
    }
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
