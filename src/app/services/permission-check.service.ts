import { Injectable, OnInit } from "@angular/core";
import { Member } from "../store/member/member.model";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Group } from "../store/group/group.model";

import * as groupSelector from "../store/group/group.selectors"
import * as memberSelector from "../store/member/member.selectors"
import { first } from "rxjs/operators";


@Injectable({ providedIn: "root" })
export class CheckPermissionService implements OnInit {
    members$: Observable<Member[]>
    group$: Observable<Group>;
    phoneNo: string;
    currentMember: Member;
    memberID:string

    // Key for permission
    canManageMeeting: boolean = false;
    canAddContribution: boolean = false;
    canManageLoan: boolean = false;
    canResetPassword: boolean = false;
    canEditPhoneNumber:boolean = false;
    isTopLeader:boolean = false;

    constructor(private store: Store, private auth: AuthService) {

        this.members$ = this.store.pipe(select(memberSelector.selectMembersSorted));
        this.group$ = this.store.pipe(select(groupSelector.selected));

        
    }
    
    initPermission() {
        // await  this.checkPermission.editPhonePermit(member)
    
        console.log(this.auth.user.phoneNumber)
        this.members$.subscribe((member) => {
          const mb = member.filter((memb) => memb.phone_number === this.auth.user.phoneNumber)
    
          this.group$.subscribe((group) => {
    
    
            this.canAddContribution = group.member_permission?.contributions.find((group) => { return group == mb[0].id }) ? true : false
    
            this.canManageLoan = group.member_permission?.loan_approval.find((group) => { return group == mb[0].id }) ? true : false
    
            this.canResetPassword = group.member_permission?.contributions.find((group) => { return group == mb[0].id }) ? true : false
    
            this.canManageMeeting = group.member_permission?.meetings.find((group) => { return group == mb[0].id }) ? true : false
    
            this.isTopLeader = group.chairperson == mb[0].id || group.secretary == mb[0].id || group.treasure == mb[0].id ? true : false
    
            console.log(`
         contribution: ${this.canAddContribution},
         loan: ${this.canManageLoan},
         resetPAss: ${this.canResetPassword},
         meeting: ${this.canManageMeeting},
         isTopLeader: ${this.isTopLeader}
         `)
    
          });
        })
      }

    ngOnInit(): void {
        
    }
   
}