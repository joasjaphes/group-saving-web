import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './share-dividend-member.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class ShareDividendMemberEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getShareDividendMembers),
    switchMap((action) => this.offlineService.getItems(DataKeys.ShareDividendMember)),
    switchMap(shareDividendMembers => [
      fromActions.upsertShareDividendMembers({shareDividendMembers}),
      fromActions.doneLoadingShareDividendMembers()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
