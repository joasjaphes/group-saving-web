import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Observable} from 'rxjs';
import {Member} from '../../../store/member/member.model';
import {FunctionsService} from '../../../services/functions.service';
import {CommonService} from '../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as fromMembers from '../../../store/member/member.selectors';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-loan-request-setting',
  templateUrl: './loan-request-setting.component.html',
  styleUrls: ['./loan-request-setting.component.css'],
  animations: [fadeIn]
})
export class LoanRequestSettingComponent implements OnInit {
  @Input() group: Group;
  @Output() closeForm = new EventEmitter();
  members$: Observable<Member[]>;
  loan_request_allowed: string;
  number_of_approval: string;
  first_approval: string[];
  second_approval: string[];
  third_approval: string[];

  firstMemberSearch: string;
  secondMemberSearch: string;
  thirdMemberSearch: string;
  loading: boolean;
  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
    private store: Store<ApplicationState>
  ) {
    this.members$ = this.store.pipe(select(fromMembers.selectUnique));
  }

  ngOnInit(): void {
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      chairperson: 'this.chairperson',
      secretary: 'this.secretary',
      treasure: 'this.treasure',
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('setLoanRequestRules', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Group loan request rules set successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  get showOne(): boolean {
    return this.number_of_approval === 'ONE' || this.number_of_approval === 'TWO' || this.number_of_approval === 'THREE'
  }

  get showTwo(): boolean {
    return this.number_of_approval === 'TWO' || this.number_of_approval === 'THREE'
  }

  get showThree(): boolean {
    return this.number_of_approval === 'THREE'
  }

  onClose() {
    this.closeForm.emit();
  }

}
