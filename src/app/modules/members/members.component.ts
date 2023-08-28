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
import * as loanTypeSelector from '../../store/loan-type/loan-type.selectors';
import * as loanSelector from '../../store/loan/loan.selectors';
import * as fineTypeSelector from '../../store/fine-type/fine-type.selectors';
import {HttpClient} from '@angular/common/http';
import {GroupProgress} from '../../store/group/group-progress.model';
import {GroupProgressEnum} from '../../store/group/group-progress.enum';
import {FineType} from '../../store/fine-type/fine-type.model';
import {Loan} from '../../store/loan/loan.model';
import {selectOneTime} from '../../store/contribution-type/contribution-type.selectors';
import {selectMemberOneTime} from '../../store/one-time-payment/one-time-payment.selectors';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members$: Observable<Member[]>;
  group$: Observable<Group>;
  contributionTypes$: Observable<ContributionType[]>;
  oneTimeContributionTypes$: Observable<ContributionType[]>;
  membersOneTimeContributionTypes$: Observable<{[id: string]: ContributionType[]}>;
  loanTypes$: Observable<LoanType[]>;
  fineTypes$: Observable<FineType[]>;
  memberName$: Observable<string>;
  progress$: Observable<any>;
  progressDetails$: Observable<GroupProgress>;
  membersLoans$: Observable<Loan[]>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  details;
  currentMember: Member;
  memberSearch: any;
  currentContribution: ContributionType;

  constructor(
    private store: Store<ApplicationState>,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private auth:AuthService
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectMembersSorted));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.progressDetails$ = this.store.pipe(select(groupSelector.selectProgress));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectRepeating));
    this.oneTimeContributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectOneTime));
    this.membersOneTimeContributionTypes$ = this.store.pipe(select(selectMemberOneTime));
    this.loanTypes$ = this.store.pipe(select(loanTypeSelector.selectAll));
    this.fineTypes$ = this.store.pipe(select(fineTypeSelector.selectDetailed));
    this.memberName$ = this.store.pipe(select(memberSelector.selectMemberName));
  }

  ngOnInit(): void {
    
  }

  async addContribution(member: Member) {
    this.currentMember = member;
    this.membersLoans$ = this.store.pipe(select(loanSelector.selectLoanByMember(member.id)));
    this.viewType = 'contribution';
    this.viewDetails = true;
    this.panelTitle = 'Add contribution from ' + member.name;
  }

  async addOneTimeContribution(member: Member, contribution: ContributionType) {
    this.currentMember = member;
    this.membersLoans$ = this.store.pipe(select(loanSelector.selectLoanByMember(member.id)));
    this.viewType = 'one-time-contribution';
    this.currentContribution = contribution;
    this.viewDetails = true;
    this.panelTitle = `Add ${this.currentContribution.name} from ${member.name}`;
  }

  async addLoan(member: Member) {
    this.currentMember = member;
    this.membersLoans$ = this.store.pipe(select(loanSelector.selectLoanByMember(member.id)));
    this.viewType = 'loan';
    this.viewDetails = true;
    this.panelTitle = 'Assign Loan  to ' + member.name;
  }

  async addFine(member: Member) {
    this.currentMember = member;
    this.viewType = 'fine';
    this.viewDetails = true;
    this.panelTitle = 'Register Fine  to be Paid By ' + member.name;
  }

  async addMembers() {
    console.log()
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

  async edit(member: Member) {
    this.currentMember = member;
    this.viewDetails = true;
    this.panelTitle = 'Update Member Details';
    this.viewType = 'update';
  }

  async addAnotherAccount(member: Member) {
    this.currentMember = member;
    this.viewDetails = true;
    this.panelTitle = 'Add members another account';
    this.viewType = 'add-another';
  }

  async editPhone(member: Member) {
    this.currentMember = member;
    this.viewDetails = true;
    this.panelTitle = 'Update Member Phone Number';
    this.viewType = 'updatePhone';
  }

  async updatePassword(member: Member) {
    this.currentMember = member;
    this.viewDetails = true;
    this.panelTitle = 'Update Member Password';
    this.viewType = 'updatePassword';
  }

  onClose() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
    this.currentMember = null;
    this.currentContribution = null;
  }
phoneNo:string;
currentM:any;
  deleteMember(){
    console.log("am waiting for instruction")
    
    // this.group$.subscribe((member)=>{console.log(`groupWithPermission ${member.chairperson}`)})
    this.store.pipe(select(groupSelector.selected)).subscribe((group)=>{console.log(group)});

    this.auth.getLoginUser().subscribe((user)=>{this.phoneNo =  user.phoneNumber})

    this.currentM =  this.members$.subscribe((mb)=>{
      mb.filter((memb)=>{
        return memb.phone_number === this.phoneNo
      })
      
    });

  //   // this.currentM[0]

  // this.members$.subscribe((memb)=>{this.currentM = memb.filter((memb,i)=>{memb[i].phone_number === this.phoneNo })});

   console.log(`Current Member: ${this.currentM}`)
  }
}
