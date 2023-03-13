import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-view-attachment',
  templateUrl: './view-attachment.component.html',
  styleUrls: ['./view-attachment.component.css']
})
export class ViewAttachmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewAttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      fileUrl: string;
      secondFileUrl:string;
      title: string;
      subtitle: string;
      description: string;
    }
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
