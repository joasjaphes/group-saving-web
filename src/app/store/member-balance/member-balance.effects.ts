import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member-balance.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class MemberBalanceEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMemberBalances),
    switchMap((action) => this.offlineService.getItems(DataKeys.MemberBalance)),
    switchMap(memberBalances => [
      fromActions.upsertMemberBalances({memberBalances}),
      fromActions.doneLoadingMemberBalances()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
