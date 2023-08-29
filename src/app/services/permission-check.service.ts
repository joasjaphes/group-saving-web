import { Injectable } from "@angular/core";
import { Member } from "../store/member/member.model";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Group } from "../store/group/group.model";

import * as groupSelector from "../store/group/group.selectors"
import * as memberSelector from "../store/member/member.selectors"


@Injectable({ providedIn: "root" })
export class CheckPermissionService {
    members$: Observable<Member[]>
    group$: Observable<Group>;
    phoneNo: string;
    currentM$: Member;

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

        this.auth.getLoginUser().subscribe((user) => { this.phoneNo = user.phoneNumber })

        this.members$.subscribe((mb) => {
            mb.filter((memb) => {
                if (memb.phone_number === this.phoneNo) {
                    this.currentM$ = memb
                }
            }
            )

        })


        this.group$.subscribe((gr) => {
            if (gr.chairperson == this.currentM$.id || gr.secretary == this.currentM$.id || gr.treasure == this.currentM$.id) {
                this.canAddContribution = true;
                this.canManageLoan = true;
                this.canResetPassword = true;
                this.canManageMeeting = true;
                this.isTopLeader = true;

                // this.isSecretary = true
                console.log("This guy is chaiperson so should do anything")
            }
            // if (gr.secretary == this.currentM$.id) {
            //     this.canAddContribution = true;
            //     this.canManageLoan = true;
            //     this.canResetPassword = true;
            //     this.canManageMeeting = true;
                
            // }
            gr.member_permission.contributions.filter((meet) => {
                if (meet === this.currentM$.id) {
                    this.canAddContribution = true;
                    console.log("Contribution Permitted")
                }
            })

            gr.member_permission.loan_approval.filter((meet) => {
                if (meet === this.currentM$.id) {
                    this.canManageLoan = true;
                    console.log("LoanApproval Permitted")
                }
                console.log("")
            })

            gr.member_permission.meetings.filter((meet) => {
                if (meet === this.currentM$.id) {
                    this.canManageMeeting = true;
                    console.log("ManageMeeting Permitted")
                } else {
                    console.log("can't Manage Meeting")
                }
            })

            gr.member_permission['password_reset']
                .filter((meet) => {
                    if (meet == this.currentM$.id) {
                        this.canResetPassword = true;
                        console.log("Reset Password Permitted")
                    }
                    console.log("Can't Reset Password")
                })

        })
    }

    editPhonePermit(member: Member) {
         if(this.currentM$.phone_number == member.phone_number){
            this.canEditPhoneNumber = true;
         }else{
            this.canEditPhoneNumber = false;
         }
         
      }


    //     deleteMember(){
    //         this.store.pipe(select(groupSelector.selected)).subscribe((group)=>{console.log(group)});


    // }
}