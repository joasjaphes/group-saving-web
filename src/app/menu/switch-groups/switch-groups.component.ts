import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Observable, Subscription} from 'rxjs';
import {MemberGroup} from '../../store/member-group/member-group.model';
import * as groupMemberSelector from '../../store/member-group/member-group.selectors';
import * as groupSelector from '../../store/group/group.selectors';
import {fadeIn} from '../../shared/animations/router-animation';
import {Group} from '../../store/group/group.model';
import {first} from 'rxjs/operators';
import {group} from '@angular/animations';
import {AuthService} from '../../services/auth.service';
import firebase from 'firebase/compat';
import User = firebase.User;
import {FunctionsService} from '../../services/functions.service';
import {CommonService} from '../../services/common.service';
import {getGroups, setSelectedGroup} from '../../store/group/group.actions';
import {setSelectedGroupId} from '../../store/user/user.actions';
import {setSelectedMember} from '../../store/member/member.actions';
import {DataKeys, GET_METHODS, UpdatedDataKeys} from '../../store/data-keys';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {LastUpdatedAt} from '../../store/last-updated-at/last-updated-at.model';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {FirestoreService} from '../../services/firestore.service';

@Component({
  selector: 'app-switch-groups',
  templateUrl: './switch-groups.component.html',
  styleUrls: ['./switch-groups.component.scss'],
  animations: [fadeIn]
})
export class SwitchGroupsComponent implements OnInit {

  memberGroups$: Observable<MemberGroup[]>;
  currentGroup$: Observable<Group>;
  user$: Observable<User>;
  newGroupMode = false;
  loading = false;
  newGroupName = '';
  memberGroupSubscription: Subscription;
  memberGroupSub: Subscription;
  fetchData = true;
  userSubscription: Subscription;
  lastUpdatedSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<SwitchGroupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<ApplicationState>,
    private userService: AuthService,
    private functionsService: FunctionsService,
    private commonService: CommonService,
    private afs: AngularFirestore,
    private offlineService: OfflineManagerService,
    private firestoreService: FirestoreService,
  ) {
    this.memberGroups$ = this.store.pipe(select(groupMemberSelector.selectAll));
    this.currentGroup$ = this.store.pipe(select(groupSelector.selected));
    this.user$ = this.userService.getLoginUser();
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async save() {
    const groupDetails = await this.currentGroup$.pipe(first(i => !!i)).toPromise();
    const userDetails = await this.user$.pipe(first(i => !!i)).toPromise();
    if (userDetails && groupDetails) {
      const dataToSave = {
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        name: userDetails.displayName,
        groupName: this.newGroupName,
        userId: userDetails.uid,
        alternative_phone_number: '',
        numberOfMembers: 1,
        countryCode: groupDetails.country,
        currency: groupDetails.currency,
        currencyName: groupDetails.currency_name,
      };
      this.loading = true;
      try {
        const data: any = await this.functionsService.saveData('createNewGroup', {
          ...dataToSave
        });
        console.log('Data zinazorudi baada ya kusaviwa');
        console.log(JSON.stringify(data));
        this.getMemberGroups(userDetails.uid, data.groupId, data.memberId).then();
        setTimeout(() => {
          this.loading = false;
          this.commonService.showSuccess('New Group created successful');
          this.closeDialog();
        }, 2000);
      } catch (e) {
        this.loading = false;
        console.error(e);
      }
    }
  }

  setCurrentGroup(memberGroup: MemberGroup) {
    localStorage.setItem('group_savings_active_group', memberGroup.group_id);
    localStorage.setItem('group_savings_current_member', memberGroup.member_id);
    this.store.dispatch(setSelectedGroup({groupId: memberGroup.group_id}));
    this.store.dispatch(setSelectedGroupId({groupId: memberGroup.group_id}));
    this.store.dispatch(setSelectedMember({memberId: memberGroup.member_id}));

    this.closeDialog();
  }

  async getMemberGroups(userId: string, groupId: string, memberId: string) {
    this.memberGroupSub = this.afs
      .collection(DataKeys.MemberGroup, ref => ref.where('user_id', '==', userId))
      .valueChanges()
      .subscribe((member_groups: MemberGroup[]) => {
        if (this.fetchData) {
          this.fetchData = false;
          this.initiateLastUpdatedTimes(member_groups);
          for (const mem of member_groups) {
            console.log(`${mem.group_id} === ${groupId} && ${mem.member_id} === ${memberId}`);
            if (mem.group_id === groupId && mem.member_id === memberId) {
              this.setActiveGroupAndMember(mem);
            }
            this.offlineService.saveItem({
              ...mem,
            }, DataKeys.MemberGroup).then();
          }
        }
      });

  }

  setActiveGroupAndMember(memberGroup) {
    const activeGroup = localStorage.getItem('group_savings_active_group');
    const currentMember = localStorage.getItem('group_savings_current_member');
    if (activeGroup) {
      this.store.dispatch(setSelectedGroup({groupId: activeGroup}));
      this.store.dispatch(setSelectedGroupId({groupId: activeGroup}));
      this.store.dispatch(setSelectedMember({memberId: currentMember}));
    } else {
      localStorage.setItem('group_savings_active_group', memberGroup.group_id);
      localStorage.setItem('group_savings_current_member', memberGroup.member_id);
      this.store.dispatch(setSelectedGroup({groupId: memberGroup.group_id}));
      this.store.dispatch(setSelectedGroupId({groupId: memberGroup.group_id}));
      this.store.dispatch(setSelectedMember({memberId: memberGroup.member_id}));
    }
  }

  async initiateLastUpdatedTimes(member_groups: any) {
    const groups = member_groups ? member_groups : [];
    for (const group1 of groups) {
      this.lastUpdatedSubscription = this.afs
        .collection('groups')
        .doc(group1.group_id)
        .collection('updated')
        .doc('others')
        .valueChanges()
        .subscribe(async (updateTimes: any) => {
          try {
            // Get Last Updated Times from the local database
            const localTimes: LastUpdatedAt = await this.offlineService.getLastUpdatedTimes();
            // get group Information
            this.firestoreService.getUpdatedData(
              localTimes,
              updateTimes,
              DataKeys.Group,
              this.firestoreService.getGroupData,
              getGroups(),
              group1.group_id,
              UpdatedDataKeys[DataKeys.Group]
            ).then();
            // get Other Information
            const keysToWorkWith = Object.keys(DataKeys)
              .map(i => DataKeys[i])
              .filter(i => i !== 'updated')
              .filter(i => i !== 'user')
              .filter(i => i !== DataKeys.MemberGroup)
              .filter(i => i !== DataKeys.LoanType)
              .filter(i => i !== DataKeys.ContributionType)
              .filter(i => i !== DataKeys.FineType)
              .filter(i => i !== DataKeys.Fine)
              .filter(i => i !== DataKeys.SharePeriods)
              .filter(i => i !== 'groups');
            for (const storeKey of keysToWorkWith) {
              this.firestoreService.getUpdatedData(
                localTimes,
                updateTimes,
                storeKey,
                this.firestoreService.getData,
                GET_METHODS[storeKey],
                group1.group_id,
                UpdatedDataKeys[storeKey]
              ).then();
            }
            this.offlineService.saveLastUpdatedTimes({
              ...updateTimes,
              id: 'times'
            }).then();
          } catch (e) {
            console.error(e);
          }
        });
    }
  }

}
