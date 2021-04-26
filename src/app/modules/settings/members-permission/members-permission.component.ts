import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn} from '../../../shared/animations/router-animation';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';

@Component({
  selector: 'app-members-permission',
  templateUrl: './members-permission.component.html',
  styleUrls: ['./members-permission.component.scss'],
  animations: [fadeIn]
})
export class MembersPermissionComponent implements OnInit {
  @Input() group: Group;
  @Input() members: Member[];
  @Output() closeForm = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
