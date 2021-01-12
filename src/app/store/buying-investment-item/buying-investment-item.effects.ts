import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './buying-investment-item.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class BuyingInvestmentItemEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getBuyingInvestmentItems),
    switchMap((action) => this.offlineService.getItems(DataKeys.BuyingInvestmentItem)),
    switchMap(buyingInvestmentItems => [
      fromActions.upsertBuyingInvestmentItems({buyingInvestmentItems}),
      fromActions.doneLoadingBuyingInvestmentItems()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
