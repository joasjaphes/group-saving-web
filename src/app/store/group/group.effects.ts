import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './group.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class GroupEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getGroups),
    switchMap((action) => this.offlineService.getItems(DataKeys.Group)),
    switchMap(groups => [
      fromActions.loadGroups({groups}),
      fromActions.doneLoadingGroups()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
