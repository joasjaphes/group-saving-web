import { Component, OnInit } from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Observable} from 'rxjs';
import {Group} from '../../store/group/group.model';
import * as groupSelector from '../../store/group/group.selectors';
import * as memberSelector from '../../store/member/member.selectors';
import {GroupProgress} from '../../store/group/group-progress.model';
import {ContributionType} from '../../store/contribution-type/contribution-type.model';
import {selectNeedBalance} from '../../store/group/group.selectors';
import {FineType} from '../../store/fine-type/fine-type.model';
import * as fineTypeSelector from '../../store/fine-type/fine-type.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [fadeIn]
})
export class SettingsComponent implements OnInit {

  menus = [
    {
      name: 'Basic Group Information',
      route: '',
      description: 'Update Basic group information like contribution frequency, currency, name and other policy',
      image: 'adjustment.png'
    },
    {
      name: 'Contribution Types',
      route: '',
      description: 'Set contribution types available for the group, Share, Social, Entry fees etc',
      image: 'money.png'
    },
    {
      name: 'Loan Types',
      route: '',
      description: 'Set loan configuration options, types of loan allowed, fines, profit contributions',
      image: 'request-money.png'
    },
    {
      name: 'Leadership',
      route: '',
      description: 'Select group leadership (Chairperson, Secretary and Treasure)',
      image: 'leadership1.png'
    },
    {
      name: 'Meeting Rules',
      route: '',
      description: 'Set rules for meetings to be help by the group, frequency, late attendance fines, missing meeting fines etc',
      image: 'meeting.png'
    },
    {
      name: 'Add Previous Data',
      route: ['', 'settings', 'add-previous-data'],
      description: 'Add data that are missing and cannot be added one by one',
      image: 'past_data.png'
    },
  ];
  group$: Observable<Group>;
  memberName$: Observable<string>;
  progress$: Observable<any>;
  progressDetails$: Observable<GroupProgress>;
  contributionTypeNeedBalance$: Observable<ContributionType[]>;
  fineTypes$: Observable<FineType[]>;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.progressDetails$ = this.store.pipe(select(groupSelector.selectProgress));
    this.memberName$ = this.store.pipe(select(memberSelector.selectFirstNameOnly));
    this.contributionTypeNeedBalance$ = this.store.pipe(select(selectNeedBalance));
    this.fineTypes$ = this.store.pipe(select(fineTypeSelector.selectAll));
  }

  ngOnInit(): void {
  }

  menuClicked(clickedMenu) {
    if (clickedMenu.name === 'Meeting Rules') {
      this.viewDetails = true;
      this.viewType = 'meeting';
    }
    if (clickedMenu.name === 'Leadership') {
      this.viewDetails = true;
      this.viewType = 'leadership';
    }
    if (clickedMenu.name === 'Basic Group Information') {
      this.viewDetails = true;
      this.viewType = 'basic';
    }
    if (clickedMenu.name === 'Contribution Balances') {
      this.viewDetails = true;
      this.viewType = 'balance';
    }
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }
}
