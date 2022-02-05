import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Loan} from '../../../store/loan/loan.model';
import * as loanSelector from '../../../store/loan/loan.selectors';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';


@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  @Input() enableDelete = false;
  currentView = 'current';
  activeLoans$: Observable<Loan[]>;
  completedLoans$: Observable<Loan[]>;
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  currentLoan: Loan;

  viewDetails = false;
  panelTitle = '';
  viewType = '';
  memberSearch = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.activeLoans$ = this.store.pipe(select(loanSelector.selectActiveLoans));
    this.completedLoans$ = this.store.pipe(select(loanSelector.selectDetailed));
  }

  ngOnInit(): void {
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Add new expense';
    this.viewType = 'add';
  }

  viewItem(item: Loan) {
    this.currentLoan = item;
    this.viewDetails = true;
    this.panelTitle = 'Loan Details';
    this.viewType = 'view';
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  getData() {
    if (this.currentView === 'current') {
      this.activeLoans$ = this.store.pipe(select(loanSelector.selectActiveLoans));
    } else {
      this.activeLoans$ = this.store.pipe(select(loanSelector.selectCompletedLoans));
    }

  }
}
