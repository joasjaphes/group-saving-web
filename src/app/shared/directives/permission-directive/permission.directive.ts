import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ApplicationState } from "src/app/store";
import { Group } from "src/app/store/group/group.model";
import { Member } from "src/app/store/member/member.model";


import * as groupSelector from "../../../store/group/group.selectors";
import * as memberSelector from "../../../store/member/member.selectors";
import { CheckPermissionService } from "src/app/services/permission-check.service";


@Directive({
    selector: "[hasPermission]"
})
export class HasPermissionDirective {


    members$: Observable<Member[]>
    group$: Observable<Group>
    phone: string;

    isPermitted: boolean;
    isTopLeader: boolean;
    permission: string;

    @Input() set hasPermission(permission: string) {

        this.permission = permission;
    }






    constructor(private tempRef: TemplateRef<any>, private viewCRef: ViewContainerRef, private store: Store<ApplicationState>, private auth: AuthService, private permissionService: CheckPermissionService) {

        this.members$ = this.store.pipe(select(memberSelector.selectMembersSorted));
        const user = this.auth.getLoginUser().toPromise();
        user.then((user) => {

            this.phone = user.phoneNumber;


            this.group$ = this.store.pipe(select(groupSelector.selected));
            
         this.members$.subscribe((member) => {

                const mb = member.find((value) => value.phone_number == user.phoneNumber)

               this.group$.subscribe((group) => {


                    if (this.permission == "topLeader") {
                        this.isPermitted = (group.chairperson == mb.id || group.secretary == mb.id || group.treasure == mb.id)

                    } else {
                        this.isPermitted = group?.member_permission[`${this.permission}`]?.includes(mb.id) || (group.chairperson == mb.id || group.secretary == mb.id || group.treasure == mb.id)
                    }

                    permissionService.permissionContainer.next((group.chairperson == mb.id || group.secretary == mb.id || group.treasure == mb.id))

                });
            })

            if (this.isPermitted) {
                this.viewCRef.createEmbeddedView(this.tempRef)

                console.log(`It's Working: ${this.isPermitted}`)
            } else {
                this.viewCRef.clear()
            }


        })




    }
}



