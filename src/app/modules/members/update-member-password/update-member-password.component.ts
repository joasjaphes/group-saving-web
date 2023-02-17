import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/store/group/group.model';
import { Member } from 'src/app/store/member/member.model';

@Component({
  selector: 'app-update-member-password',
  templateUrl: './update-member-password.component.html',
  styleUrls: ['./update-member-password.component.scss']
})
export class UpdateMemberPasswordComponent implements OnInit {
  @Input() group: Group;
  @Input() memberName: string;
  @Input() member: Member;
  @Input() members: Member[];
  @Output() closeForm = new EventEmitter();

  loading = false;

  passWord:string;
  confirmPassword:string;
  constructor() { }

  ngOnInit(): void {
  }

  closeDialog() {}

  save() {}

}
