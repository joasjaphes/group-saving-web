import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {OfflineManagerService} from './offline-manager.service';
import {ApplicationState} from '../store';
import {Store} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {map} from 'rxjs/operators';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private afs: AngularFirestore,
    private offlineService: OfflineManagerService,
    private store: Store<ApplicationState>,
    private commonService: CommonService,
  ) {
  }

  async getData(last_update_time, currentClass: FirestoreService, dataKey: string, groupId: string) {
    const collection = await currentClass
      .afs
      .collection('groups')
      .doc(groupId)
      .collection(dataKey, ref => ref.where('last_update', '>', last_update_time))
      .get()
      .pipe(map(i => i.docs))
      .pipe(map(i => i.map(k => k.data() as any))
      ).toPromise();
    console.log({collection});
    currentClass.commonService.setIsLoading(false);
    for (const item of collection) {
      if (item.deleted) {
        await currentClass.offlineService.removeItem(dataKey, item.id);
      } else {
        await currentClass.offlineService.saveItem(item, dataKey);
      }
    }
  }

  async getGroupData(last_update_time, currentClass: FirestoreService, dataKey: string, groupId: string) {
    const collection: any = await currentClass
      .afs
      .collection('groups', ref => ref.where('last_update', '>', last_update_time))
      .doc(groupId)
      .get()
      .pipe(map(i => i.data()))
      .toPromise();
    if (collection.deleted) {
      await currentClass.offlineService.removeItem(dataKey, collection.id);
    } else {
      await currentClass.offlineService.saveItem(collection, dataKey);
    }
  }

  async getUpdatedData(
    localTimes: any,
    onlineTimes: any,
    dbKey: string,
    dataGetter: (time, currentClass: FirestoreService, dataKey: string, group_id: string) => Promise<any>,
    dispatcher: TypedAction<any>,
    group_id: string,
    updatedKey: string,
  ) {
    if (localTimes) {
      const local_time = (localTimes ? localTimes[updatedKey] : 0) || 0;
      const online_time = (onlineTimes ? onlineTimes[updatedKey] : 0) || 0;
      if (local_time !== online_time) {
        await dataGetter(local_time, this, dbKey, group_id);
        this.store.dispatch(dispatcher);
      }
    } else {
      await dataGetter(0, this, dbKey, group_id);
      this.store.dispatch(dispatcher);
    }
  }
}
