import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './buying-investment-distribution.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class BuyingInvestmentDistributionEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getBuyingInvestmentDistributions),
    switchMap((action) => this.offlineService.getItems(DataKeys.Announcement)),
    switchMap(buyingInvestmentDistributions => [
      fromActions.upsertBuyingInvestmentDistributions({buyingInvestmentDistributions}),
      fromActions.doneLoadingBuyingInvestmentDistributions()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
