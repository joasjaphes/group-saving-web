import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './contribution-type.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class ContributionTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getContributionTypes),
    switchMap((action) => this.offlineService.getItems(DataKeys.ContributionType)),
    switchMap(contributionTypes => [
      fromActions.upsertContributionTypes({contributionTypes}),
      fromActions.doneLoadingContributionTypes()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
