import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as groupSelector from '../../../store/group/group.selectors';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import * as memberSelector from '../../../store/member/member.selectors';
import {LoanType} from '../../../store/loan-type/loan-type.model';
import * as loanSelector from '../../../store/loan-type/loan-type.selectors';
import {FineType} from '../../../store/fine-type/fine-type.model';
import * as fineSelector from '../../../store/fine-type/fine-type.selectors';
import {selectUnique} from '../../../store/member/member.selectors';

@Component({
  selector: 'app-previous-data',
  templateUrl: './previous-data.component.html',
  styleUrls: ['./previous-data.component.scss']
})
export class PreviousDataComponent implements OnInit {
  menus = [
    {
      name: 'Import Contributions',
      route: '',
      description: 'Add contributions from excel file',
      image: 'export-excel.png'
    },
    {
      name: 'Import Loans',
      route: '',
      description: 'Add loans from excel file',
      image: 'request-money.png'
    },
    {
      name: 'Contribution By Member',
      route: '',
      description: 'Add past contribution for a specific member for many periods',
      image: 'contribution.png'
    },
    {
      name: 'Contribution By Period',
      route: '',
      description: 'Add all past contributions for a specific period for all members',
      image: 'contribution1.png'
    },
    {
      name: 'Expense By Period',
      route: '',
      description: 'Add all past group expenses for a specific period',
      image: 'cash-in-hand.png'
    },
    {
      name: 'Loans',
      route: '',
      description: 'Add current active and past completed loans to members',
      image: 'request-money.png'
    },
    {
      name: 'Fines',
      route: '',
      description: 'Add past fines paid if available',
      image: 'fine.png'
    },
    {
      name: 'Delete Contribution',
      route: ['', 'settings', 'delete-contributions'],
      description: 'Delete contributions when they are wrongly entered',
      image: 'expense-book.png'
    },
    {
      name: 'Delete Loans',
      route: ['', 'settings', 'delete-loans'],
      description: 'Delete contributions when they are wrongly entered',
      image: 'expense-book.png'
    },
    {
      name: 'Delete Fines',
      route: ['', 'settings', 'delete-fines'],
      description: 'Delete contributions when they are wrongly entered',
      image: 'expense-book.png'
    },
  ];

  viewDetails = false;
  panelTitle = '';
  viewType = '';
  members$: Observable<Member[]>;
  uniqueMembers$: Observable<Member[]>;
  group$: Observable<Group>;
  loanTypes$: Observable<LoanType[]>;
  fineTypes$: Observable<FineType[]>;
  contributionTypes$: Observable<ContributionType[]>;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.loanTypes$ = this.store.pipe(select(loanSelector.selectAll));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectRepeating));
    this.members$ = this.store.pipe(select(memberSelector.selectDetailed));
    this.uniqueMembers$ = this.store.pipe(select(memberSelector.selectUnique));
    this.fineTypes$ = this.store.pipe(select(fineSelector.selectAll));
  }

  ngOnInit(): void {
  }

  openPanel(title: any) {
    this.viewDetails = true;
    this.viewType = title.name;
    this.panelTitle = title.description;
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

}
