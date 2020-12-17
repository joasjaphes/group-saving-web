import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class MemberEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMembers),
    switchMap((action) => this.offlineService.getItems(DataKeys.Member)),
    switchMap(members => [
      fromActions.loadMembers({members}),
      fromActions.doneLoadingMembers()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}
}
