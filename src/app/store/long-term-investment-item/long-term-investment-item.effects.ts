import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './long-term-investment-item.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LongTermInvestmentItemEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLongTermInvestmentItems),
    switchMap((action) => this.offlineService.getItems(DataKeys.LongTermInvestmentItem)),
    switchMap(longTermInvestmentItems => [
      fromActions.upsertLongTermInvestmentItems({longTermInvestmentItems}),
      fromActions.doneLoadingLongTermInvestmentItems()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
