import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {OfflineManagerService} from './offline-manager.service';
import {ApplicationState} from '../store';
import {Store} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private afs: AngularFirestore,
    private offlineService: OfflineManagerService,
    private store: Store<ApplicationState>
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
    for (const item of collection) {
      if (item.deleted) {
        await currentClass.offlineService.removeItem(dataKey, item.id);
      } else {
        await currentClass.offlineService.saveItem(item, dataKey);
      }
    }
  }

  async getGroupData(last_update_time, currentClass: FirestoreService, dataKey: string, groupId: string) {
    console.log('nafika kwenye group');
    const collection: any = await currentClass
      .afs
      .collection('groups', ref => ref.where('last_update', '>', last_update_time))
      .doc(groupId)
      .get()
      .pipe(map(i => i.data()))
      .toPromise();
    console.log({last_update_time});
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
    if (dbKey === 'groups')  { console.log('huku pia nako....'); }
    if (localTimes) {
      if (dbKey === 'groups')  { console.log('local time imepatikana....', updatedKey); }
      const local_time = localTimes[updatedKey] || 0;
      const online_time = onlineTimes[updatedKey] || 0;
      if (dbKey === 'groups')  { console.log(`${local_time} !== ${online_time}`); }
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
