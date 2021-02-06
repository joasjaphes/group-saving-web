import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GroupProgressDialogComponent} from './group-progress-dialog/group-progress-dialog.component';
import {Group} from '../../../store/group/group.model';
import {GroupProgress} from '../../../store/group/group-progress.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as groupSelector from '../../../store/group/group.selectors';
import * as memberSelector from '../../../store/member/member.selectors';
import {selectNeedBalance} from '../../../store/group/group.selectors';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-group-progress',
  templateUrl: './group-progress.component.html',
  styleUrls: ['./group-progress.component.scss']
})
export class GroupProgressComponent implements OnInit {

  group$: Observable<Group>;
  progress$: Observable<any>;
  progressDetails$: Observable<GroupProgress>;
  memberName$: Observable<string>;
  contributionTypeNeedBalance$: Observable<ContributionType[]>;
  assignedNumber = 0;
  constructor(
    public dialog: MatDialog,
    private store: Store<ApplicationState>
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.progressDetails$ = this.store.pipe(select(groupSelector.selectProgress));
    this.memberName$ = this.store.pipe(select(memberSelector.selectFirstNameOnly));
    this.contributionTypeNeedBalance$ = this.store.pipe(select(selectNeedBalance));

  }

  ngOnInit(): void {
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async openModel() {
    const group = await this.group$.pipe(first()).toPromise();
    const progressDetails = await this.progressDetails$.pipe(first()).toPromise();
    const memberName = await this.memberName$.pipe(first()).toPromise();
    const contributionTypeNeedBalance = await this.contributionTypeNeedBalance$.pipe(first()).toPromise();
    const dialogRef = this.dialog.open(GroupProgressDialogComponent, {
      width: '80%',
      minHeight: '60vh',
      data: {
        group,
        progressDetails,
        progressDetailsKey: progressDetails.key,
        memberName,
        contributionTypeNeedBalance,
      },
      disableClose: true,
    });
  }
}
