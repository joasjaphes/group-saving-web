import {Component, OnInit} from '@angular/core';
import {fadeIn} from '../../shared/animations/router-animation';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Observable} from 'rxjs';
import {Group} from '../../store/group/group.model';
import * as groupSelector from '../../store/group/group.selectors';
import * as memberSelector from '../../store/member/member.selectors';
import * as loanSelector from '../../store/loan-type/loan-type.selectors';
import {GroupProgress} from '../../store/group/group-progress.model';
import {ContributionType} from '../../store/contribution-type/contribution-type.model';
import {selectNeedBalance} from '../../store/group/group.selectors';
import {FineType} from '../../store/fine-type/fine-type.model';
import * as fineTypeSelector from '../../store/fine-type/fine-type.selectors';
import {first} from 'rxjs/operators';
import {Member} from '../../store/member/member.model';
import {ActivatedRoute} from '@angular/router';
import {LoanType} from '../../store/loan-type/loan-type.model';

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
      route: ['', 'settings', 'contribution-types'],
      description: 'Set contribution types available for the group, Share, Social, Entry fees etc',
      image: 'contribution.png'
    },
    {
      name: 'Loan Types',
      route: ['', 'settings', 'loan-types'],
      description: 'Set loan configuration options, types of loan allowed, fines, profit contributions',
      image: 'request-money.png'
    },
    {
      name: 'Fine Types',
      route: ['', 'settings', 'fine-types'],
      description: 'Set fine types available for the group',
      image: 'fine.png'
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
      name: 'Contribution Type Balances',
      route: '',
      description: 'Update balances for contribution types to match that of bank',
      image: 'money.png'
    },
    {
      name: 'Member Permissions',
      route: '',
      description: 'Manage which member will manage meetings, contributions and other group settings',
      image: 'users-settings.png'
    },
    {
      name: 'Add Previous Data',
      route: ['', 'settings', 'add-previous-data'],
      description: 'Add existing group data that are missing and cannot be added one by one',
      image: 'past_data.png'
    },
    {
      name: 'Delete Contribution',
      route: ['', 'settings', 'delete-contributions'],
      description: 'Delete contributions when they are wrongly entered',
      image: 'expense-book.png'
    },
  ];
  group$: Observable<Group>;
  memberName$: Observable<string>;
  members$: Observable<Member[]>;
  loanTypes$: Observable<LoanType[]>;
  progress$: Observable<any>;
  progressDetails$: Observable<GroupProgress>;
  contributionTypeNeedBalance$: Observable<ContributionType[]>;
  fineTypes$: Observable<FineType[]>;
  viewDetails = false;
  panelTitle = '';
  viewType = '';

  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.progressDetails$ = this.store.pipe(select(groupSelector.selectProgress));
    this.memberName$ = this.store.pipe(select(memberSelector.selectFirstNameOnly));
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.contributionTypeNeedBalance$ = this.store.pipe(select(selectNeedBalance));
    this.fineTypes$ = this.store.pipe(select(fineTypeSelector.selectAll));
    this.loanTypes$ = this.store.pipe(select(loanSelector.selectAll));
  }

  ngOnInit(): void {
    this.checkIfGroupHasShare().then();
    this.route.queryParams.subscribe(params => {
      console.log({params});
    });
  }

  async checkIfGroupHasShare() {
    const group = await this.group$.pipe(first(i => !!i && !!i.group_name)).toPromise();
    console.log({group});
    if (group && group.has_share) {
      this.menus.push({
        name: 'Contribution Cycle',
        route: '',
        description: 'Update group share collection start date and date of share distribution',
        image: 'timeline.png'
      });
    }
  }

  menuClicked(clickedMenu) {
    if (clickedMenu.name === 'Meeting Rules') {
      this.panelTitle = 'Define meeting rules';
      this.viewDetails = true;
      this.viewType = 'meeting';
    }
    if (clickedMenu.name === 'Leadership') {
      this.panelTitle = 'Define group leadership';
      this.viewDetails = true;
      this.viewType = 'leadership';
    }
    if (clickedMenu.name === 'Basic Group Information') {
      this.panelTitle = 'Basic group information';
      this.viewDetails = true;
      this.viewType = 'basic';
    }
    if (clickedMenu.name === 'Contribution Type Balances') {
      this.panelTitle = 'Update contribution type balances';
      this.viewDetails = true;
      this.viewType = 'balance';
    }
    if (clickedMenu.name === 'Contribution Cycle') {
      this.panelTitle = 'Set Contribution Cycle';
      this.viewDetails = true;
      this.viewType = 'shareTimeline';
    }
    if (clickedMenu.name === 'Member Permissions') {
      this.panelTitle = 'Set Key Members Permissions';
      this.viewDetails = true;
      this.viewType = 'memberPermission';
    }
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }
}
