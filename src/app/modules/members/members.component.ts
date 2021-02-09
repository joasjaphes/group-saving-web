import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../store/member/member.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import * as memberSelector from '../../store/member/member.selectors';
import * as groupSelector from '../../store/group/group.selectors';
import * as contributionTypeSelector from '../../store/contribution-type/contribution-type.selectors';
import {Group} from '../../store/group/group.model';
import {GroupProgressDialogComponent} from '../../shared/components/group-progress/group-progress-dialog/group-progress-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {first} from 'rxjs/operators';
import {ContributionType} from '../../store/contribution-type/contribution-type.model';
import {LoanType} from '../../store/loan-type/loan-type.model';
import * as loanSelector from '../../store/loan-type/loan-type.selectors';
import * as fineTypeSelector from '../../store/fine-type/fine-type.selectors';
import {HttpClient} from '@angular/common/http';
import {GroupProgress} from '../../store/group/group-progress.model';
import {GroupProgressEnum} from '../../store/group/group-progress.enum';
import {FineType} from '../../store/fine-type/fine-type.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members$: Observable<Member[]>;
  group$: Observable<Group>;
  contributionTypes$: Observable<ContributionType[]>;
  loanTypes$: Observable<LoanType[]>;
  fineTypes$: Observable<FineType[]>;
  memberName$: Observable<string>;
  progress$: Observable<any>;
  progressDetails$: Observable<GroupProgress>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  details;
  currentMember: Member;

  constructor(
    private store: Store<ApplicationState>,
    private httpClient: HttpClient,
    public dialog: MatDialog,
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.progressDetails$ = this.store.pipe(select(groupSelector.selectProgress));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectRepeating));
    this.loanTypes$ = this.store.pipe(select(loanSelector.selectAll));
    this.fineTypes$ = this.store.pipe(select(fineTypeSelector.selectDetailed));
    this.memberName$ = this.store.pipe(select(memberSelector.selectMemberName));
  }

  ngOnInit(): void {
  }

  async addContribution(member: Member) {
    this.currentMember = member;
    this.viewType = 'contribution';
    this.viewDetails = true;
    this.panelTitle = 'Add contribution from ' + member.name;
  }

  async addLoan(member: Member) {
    this.currentMember = member;
    this.viewType = 'loan';
    this.viewDetails = true;
    this.panelTitle = 'Assign Loan  to ' + member.name;
  }

  async addMembers() {
    this.viewType = 'add';
    this.viewDetails = true;
    this.panelTitle = 'Assign new member';
  }

  async openModel() {
    const group = await this.group$.pipe(first()).toPromise();
    const progressDetails = {
      title: 'Add ' + group?.group_name + ' group members',
      buttonLabel: 'Add Members',
      key: GroupProgressEnum.AddMembers,
      contributionTypeId: null
    };
    const memberName = await this.memberName$.pipe(first()).toPromise();
    const progressDetailsKey = GroupProgressEnum.AddMembers;
    const dialogRef = this.dialog.open(GroupProgressDialogComponent, {
      width: '80%',
      minHeight: '60vh',
      data: {
        group,
        progressDetails,
        progressDetailsKey,
        memberName,
        contributionTypeNeedBalance: false,
      },
      disableClose: true,
    });
  }

  async edit() {
    try {
      const url = 'https://demo.shulesoft.com/api/mobile?method=getParent&phone=+255624076248';
      const response = await this.httpClient.post(url, {}).toPromise();
      console.log(JSON.stringify(response));
    } catch (e) {
      console.error(e);
    }
  }

  onClose() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }
}
