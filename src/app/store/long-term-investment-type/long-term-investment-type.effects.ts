import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './long-term-investment-type.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LongTermInvestmentTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLongTermInvestmentTypes),
    switchMap((action) => this.offlineService.getItems(DataKeys.LongTermInvestmentType)),
    switchMap(longTermInvestmentTypes => [
      fromActions.loadLongTermInvestmentTypes({longTermInvestmentTypes}),
      fromActions.doneLoadingLongTermInvestmentTypes()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
