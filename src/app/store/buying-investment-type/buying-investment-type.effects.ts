import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './buying-investment-type.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class BuyingInvestmentTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getBuyingInvestmentTypes),
    switchMap((action) => this.offlineService.getItems(DataKeys.BuyingInvestmentType)),
    switchMap(buyingInvestmentTypes => [
      fromActions.loadBuyingInvestmentTypes({buyingInvestmentTypes}),
      fromActions.doneLoadingBuyingInvestmentTypes()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
