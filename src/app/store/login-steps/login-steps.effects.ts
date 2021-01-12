import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './login-steps.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LoginStepsEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoginSteps),
    switchMap((action) => this.offlineService.getItems('login_steps')),
    switchMap(loginSteps => [
      fromActions.upsertLoginSteps({loginSteps}),
      fromActions.doneLoadingLoginSteps()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
