import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Observable} from 'rxjs';
import {Group} from '../../store/group/group.model';
import * as groupSelector from '../../store/group/group.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  group$: Observable<Group>;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
  }

  ngOnInit(): void {
  }

}
