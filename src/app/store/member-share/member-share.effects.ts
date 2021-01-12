import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member-share.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class MemberShareEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMemberShares),
    switchMap((action) => this.offlineService.getItems(DataKeys.MemberShare)),
    switchMap(memberShares => [
      fromActions.upsertMemberShares({memberShares}),
      fromActions.doneLoadingMemberShares()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
