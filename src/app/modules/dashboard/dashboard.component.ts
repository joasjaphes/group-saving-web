import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Observable} from 'rxjs';
import {Group} from '../../store/group/group.model';
import * as groupSelector from '../../store/group/group.selectors';
import * as contrSelector from '../../store/contribution-type/contribution-type.selectors';
import {ContributionType} from '../../store/contribution-type/contribution-type.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  group$: Observable<Group>;
  contributions$: Observable<ContributionType[]>;
  progress$: Observable<any>;
  progressDetails$: Observable<any>;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributions$ = this.store.pipe(select(contrSelector.selectAll));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.progressDetails$ = this.store.pipe(select(groupSelector.selectProgress));
  }

  ngOnInit(): void {
  }

}
