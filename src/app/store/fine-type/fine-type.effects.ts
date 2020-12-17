import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './fine-type.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class FineTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getFineTypes),
    switchMap((action) => this.offlineService.getItems(DataKeys.FineType)),
    switchMap(fineTypes => [
      fromActions.loadFineTypes({fineTypes}),
      fromActions.doneLoadingFineTypes()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
