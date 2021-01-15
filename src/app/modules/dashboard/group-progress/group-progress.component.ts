import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GroupProgressDialogComponent} from './group-progress-dialog/group-progress-dialog.component';
import {Group} from '../../../store/group/group.model';

@Component({
  selector: 'app-group-progress',
  templateUrl: './group-progress.component.html',
  styleUrls: ['./group-progress.component.scss']
})
export class GroupProgressComponent implements OnInit {

  @Input() group: Group;
  @Input() progress: number;
  @Input() progressDetails: {title: string; buttonLabel: string};
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openModel() {
    const dialogRef = this.dialog.open(GroupProgressDialogComponent, {
      width: '80%',
      minHeight: '60vh',
      data: {
        group: this.group
      }
    });
  }
}
