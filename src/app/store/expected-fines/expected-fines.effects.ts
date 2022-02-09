import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './expected-fines.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';
import {ExpectedFine} from './expected-fines.model';

@Injectable()
export class ExpectedFinesEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getExpectedFines),
    switchMap((action) => this.offlineService.getItems(DataKeys.ExpectedFine)),
    switchMap(expectedFines => {
      const finesToSave: ExpectedFine[] = [];
      expectedFines.forEach((fine) => {
        if ('fines' in fine) {
          fine.fines.forEach(item => {
            finesToSave.push({
              ...item,
              last_update: fine.last_update
            });
          });
        }
      });
      return [
        fromActions.upsertExpectedFines({expectedFines: finesToSave}),
        fromActions.doneLoadingExpectedFines()
      ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {
  }

}
