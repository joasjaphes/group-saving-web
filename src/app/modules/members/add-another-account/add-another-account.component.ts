import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';

@Component({
  selector: 'app-add-another-account',
  templateUrl: './add-another-account.component.html',
  styleUrls: ['./add-another-account.component.css']
})
export class AddAnotherAccountComponent implements OnInit {
  @Input() group: Group;
  @Input() member: Member;
  @Input() memberName: string;
  @Input() members: Member[];
  @Output() closeForm = new EventEmitter();
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  async save() {
    const dataToSave = {
      memberId: this.member.id,
      groupName: this.group.group_name,
      groupId: this.group.id,
      phoneNumber: this.member.phone_number,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('addAnotherAccount', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Members second account set successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  onClose() {
    console.log('naitwa');
    this.closeForm.emit();
  }


}
