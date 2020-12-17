import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member-group.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class MemberGroupEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMemberGroups),
    switchMap((action) => this.offlineService.getItems(DataKeys.MemberGroup)),
    switchMap(memberGroups => [
      fromActions.loadMemberGroups({memberGroups}),
      fromActions.doneLoadingMemberGroups()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
