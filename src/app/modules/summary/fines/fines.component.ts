import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FineType} from '../../../store/fine-type/fine-type.model';
import * as fineSelector from '../../../store/fine-type/fine-type.selectors';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import {first} from 'rxjs/operators';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.scss'],
  animations: [fadeIn]
})
export class FinesComponent implements OnInit {
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  fineTypes$: Observable<FineType[]>;
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  fines$: Observable<{name: string, total: number, id: string, key: string, description: string}[]>;
  finesSummary$: Observable<{name: string, total: number, id: string}[]>;
  currentView = 'Members';
  year = new Date().getFullYear();
  years$: Observable<string[]>;
  fineType = 'All';
  fineTypeName = 'All';
  fineTypeTotal = 0;
  memberSearch: any;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  currentFines$: Observable<any>;

  constructor(
    private store: Store<ApplicationState>
  ) {
    this.fineTypes$ = this.store.pipe(select(fineSelector.selectDetailed));
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
    this.fines$ = this.store.pipe(select(paymentSelector.selectFinesDetailedGroupByMember(this.year, this.fineType)));
    this.finesSummary$ = this.store.pipe(select(paymentSelector.selectFineTypesSummary(this.year)));
  }

  ngOnInit(): void {
    this.initiateFineTypes().then();
  }

  async initiateFineTypes() {
    const fineTypes = await this.finesSummary$.pipe(first(i => i.length > 1)).toPromise();
    console.log({fineTypes});
    if (fineTypes) {
      this.fineTypeTotal = fineTypes[0].total;
      this.fineTypeName = fineTypes[0].name;
      this.fineType = fineTypes[0].id;
    }
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Add new expense';
    this.viewType = 'add';
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  setYear(year: any) {
    this.year = year;
    this.getData();
  }

  getData() {
    if (this.currentView === 'Members') {
      this.fines$ = this.store.pipe(select(paymentSelector.selectFinesDetailedGroupByMember(this.year, this.fineType)));
    } else {
      this.fines$ = this.store.pipe(select(paymentSelector.selectFineDetailedGroupByMonth(this.year, this.fineType)));
    }
    this.finesSummary$ = this.store.pipe(select(paymentSelector.selectFineTypesSummary(this.year)));

  }

  setFineType(fineType: any) {
    this.fineType = fineType ? fineType.id : 'All';
    this.fineTypeName = fineType ? fineType.name : 'All';
    this.fineTypeTotal = fineType ? fineType.total : '';
    this.getData();
  }

  setType(param) {
    this.memberSearch = '';
    this.currentView = param;
    this.getData();
  }

  viewFines(payment: any) {
    if (payment.type === 'member') {
      this.currentFines$ = this.store.pipe(select(paymentSelector.selectFinesByMemberByYear(this.year, payment.id, this.fineType)));
      this.panelTitle = this.year + ' Fines for ' + payment.name;
    } else {
      this.currentFines$ = this.store.pipe(select(paymentSelector.selectFinesByMonthByYear(this.year, payment.key, this.fineType)));
      this.panelTitle = ' Fines for ' + payment.name;
    }
    this.viewDetails = true;
    this.viewType = 'view';
  }
}
