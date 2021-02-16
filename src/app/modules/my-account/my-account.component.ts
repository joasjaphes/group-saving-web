import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../store/member/member.model';
import {Group} from '../../store/group/group.model';
import {select, Store} from '@ngrx/store';
import * as groupSelector from '../../store/group/group.selectors';
import * as memberSelector from '../../store/member/member.selectors';
import {ApplicationState} from '../../store';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  member$: Observable<Member>;
  group$: Observable<Group>;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.member$ = this.store.pipe(select(memberSelector.selected));

  }

  ngOnInit(): void {
  }

}
