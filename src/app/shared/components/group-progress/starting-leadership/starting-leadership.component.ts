import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../animations/router-animation';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {Observable} from 'rxjs';
import {Member} from '../../../../store/member/member.model';
import * as fromMembers from '../../../../store/member/member.selectors';

@Component({
  selector: 'app-starting-leadership',
  templateUrl: './starting-leadership.component.html',
  styleUrls: ['./starting-leadership.component.scss'],
  animations: [fadeIn]
})
export class StartingLeadershipComponent implements OnInit {
  @Input() group: Group;
  @Output() closeForm = new EventEmitter();
  members$: Observable<Member[]>;

  chairperson: string;
  treasure: string;
  secretary: string;
  loading: any;
  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
    private store: Store<ApplicationState>
  ) {
    this.members$ = this.store.pipe(select(fromMembers.selectAll));
  }

  ngOnInit(): void {
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      chairperson: this.chairperson,
      secretary: this.secretary,
      treasure: this.treasure,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('setGroupLeadership', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Group leadership information set successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  onClose() {
    this.closeForm.emit();
  }
}
