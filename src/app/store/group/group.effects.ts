import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './group.actions';
import * as fromFineTypeActions from '../fine-type/fine-type.actions';
import * as fromContributionTYpeActions from '../contribution-type/contribution-type.actions';
import * as fromLoanTypeActions from '../loan-type/loan-type.actions';
import * as fromLoanQueueActions from '../loan-queue/loan-queue.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';
import {Group} from './group.model';

@Injectable()
export class GroupEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getGroups),
    tap((action) => console.log('group inaitwa')),
    switchMap((action) => this.offlineService.getItems(DataKeys.Group)),
    switchMap((groups: Group[]) => {
      const loanTypes = [];
      const fineTypes = [];
      const loanQueues = [];
      const contributionTypes = [];
      groups.forEach(group => {
        const loans = Object.keys(group.loanTypes).map(i => group.loanTypes[i]);
        const fines = Object.keys(group.fines).map(i => group.fines[i]);
        const loanQueu = group.loan_queue || [];
        const contributions = Object.keys(group.contributions).map(i => group.contributions[i]);
        loanTypes.push(...loans);
        fineTypes.push(...fines);
        loanQueues.push(...loanQueu);
        contributionTypes.push(...contributions);
      });
      return [
        fromActions.upsertGroups({groups}),
        fromLoanTypeActions.upsertLoanTypes({loanTypes}),
        fromContributionTYpeActions.upsertContributionTypes({contributionTypes}),
        fromFineTypeActions.upsertFineTypes({fineTypes}),
        fromLoanQueueActions.upsertLoanQueues({loanQueues}),
        fromActions.doneLoadingGroups()
      ];
    })
  ));

  isIterable(obj){
    if (obj === undefined || obj === null){
      return false;
    }
    return obj.iterator !== undefined;
  }

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
