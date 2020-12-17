import { Injectable } from '@angular/core';
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
  ) { }

  async getData(last_update_time, currentClass: FirestoreService, dataKey: string) {
    const collection = await currentClass.afs.collection('other-seller', ref => ref.where('last_updated', '>=', last_update_time))
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

  getUpdatedData(
    localTimes: any,
    onlineTimes: any,
    dbKey: string,
    dataGetter: (time, currentClass: FirestoreService, dataKey: string) => Promise<any>,
    dispatcher: TypedAction<any>
  ) {
    if (localTimes) {
      const local_time = localTimes[dbKey] || 0;
      const online_time = onlineTimes[dbKey] || 0;
      if (local_time !== online_time) {
        dataGetter(local_time, this, dbKey).then(
          d => this.store.dispatch(dispatcher)
        );
      }
    } else {
      dataGetter(0, this, dbKey).then(
        d => this.store.dispatch(dispatcher)
      );
    }
  }
}
