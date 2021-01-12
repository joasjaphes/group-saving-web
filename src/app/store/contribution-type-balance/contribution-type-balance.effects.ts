import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './contribution-type-balance.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class ContributionTypeBalanceEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getContributionTypeBalances),
    switchMap((action) => this.offlineService.getItems(DataKeys.ContributionTypeBalance)),
    switchMap(contributionTypeBalances => [
      fromActions.upsertContributionTypeBalances({contributionTypeBalances}),
      fromActions.doneLoadingContributionTypeBalances()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
