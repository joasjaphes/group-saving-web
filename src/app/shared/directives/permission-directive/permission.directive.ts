import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ApplicationState } from "src/app/store";
import { Group } from "src/app/store/group/group.model";
import { Member } from "src/app/store/member/member.model";


import * as groupSelector from "../../../store/group/group.selectors";
import * as memberSelector from "../../../store/member/member.selectors";


@Directive({
    selector: "[hasPermission]"
})
export class HasPermissionDirective {
    @Input() set hasPermission(args: { member: Member, permission: string }) {

        this.permission = args.permission;
    }

    members$: Observable<Member[]>
    group$: Observable<Group>
    phone: string;

    // Key for permission
    canManageMeeting: boolean;
    canAddContribution: boolean;
    canManageLoan: boolean;
    isMe: boolean;
    canResetPassword: boolean;
    canEditPhoneNumber: boolean;
    isTopLeader: boolean;
    permission: string;



    


    constructor(private tempRef: TemplateRef<any>, private viewCRef: ViewContainerRef, private store: Store<ApplicationState>, private auth: AuthService) {

        


        const user = this.auth.getLoginUser().toPromise();
        user.then((user) => {
            this.phone = user.phoneNumber;

      

            


            this.group$ = this.store.pipe(select(groupSelector.selected));
            this.members$ = this.store.pipe(select(memberSelector.selectMembersSorted));
            this.members$.subscribe((member) => {

                const mb = member.find((mb) => mb.phone_number == user.phoneNumber)



                this.group$.subscribe((group) => {


                    this.canAddContribution = group.member_permission?.contributions.find((group) => { return group == mb.id }) ? true : false

                    this.canManageLoan = group.member_permission?.loan_approval.find((group) => { return group == mb.id }) ? true : false

                    this.canResetPassword = group.member_permission?.contributions.find((group) => { return group == mb.id }) ? true : false

                    this.canManageMeeting = group.member_permission?.meetings.find((group) => { return group == mb.id }) ? true : false

                    this.isTopLeader = group.chairperson == mb.id || group.secretary == mb.id || group.treasure == mb.id ? true : false


                    console.log(`
                                contribution: ${this.canAddContribution},
                                loan: ${this.canManageLoan},
                                resetPAss: ${this.canResetPassword},
                                meeting: ${this.canManageMeeting},
                                isTopLeader: ${this.isTopLeader}
               `)

                });
            })




            if (this.isTopLeader) {
                this.viewCRef.createEmbeddedView(tempRef)
                console.log("Ye He's")
            } else if (this.canManageLoan && this.permission === "loanManager") {
                this.viewCRef.createEmbeddedView(tempRef)
            } else if (this.canAddContribution && this.permission === "contributor") {
                this.viewCRef.createEmbeddedView(tempRef)
            } else if (this.canResetPassword && this.permission == "psd" ) {
                this.viewCRef.createEmbeddedView(tempRef)
            }


            else {
                this.viewCRef.clear()
            }

        })




    }
}



