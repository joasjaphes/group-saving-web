import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GroupProgressDialogComponent} from './group-progress-dialog/group-progress-dialog.component';
import {Group} from '../../../store/group/group.model';
import {GroupProgress} from '../../../store/group/group-progress.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';

@Component({
  selector: 'app-group-progress',
  templateUrl: './group-progress.component.html',
  styleUrls: ['./group-progress.component.scss']
})
export class GroupProgressComponent implements OnInit, OnChanges {

  @Input() group: Group;
  @Input() memberName: string;
  @Input() progress: number;
  @Input() progressDetails: GroupProgress;
  @Input() contributionTypeNeedBalance: ContributionType[];

  assignedNumber = 0;
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.runNumbers().then();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.runNumbers().then();
  }

  async runNumbers() {
    for (let i = 1; i <= this.progress; i++) {
      await this.delay(1000 / this.progress);
      this.assignedNumber = i;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  openModel() {
    const dialogRef = this.dialog.open(GroupProgressDialogComponent, {
      width: '80%',
      minHeight: '60vh',
      data: {
        group: this.group,
        progressDetails: this.progressDetails,
        progressDetailsKey: this.progressDetails.key,
        memberName: this.memberName,
        contributionTypeNeedBalance: this.contributionTypeNeedBalance,
      },
      disableClose: true,
    });
  }
}
