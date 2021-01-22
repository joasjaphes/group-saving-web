import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member.actions';
import * as loanActions from '../loan/loan.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';
import {Member} from './member.model';

@Injectable()
export class MemberEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMembers),
    switchMap((action) => this.offlineService.getItems(DataKeys.Member)),
    switchMap((members: Member[]) => {
      const loans = [];
      members.forEach(member => {
        if (member.active_loans) {
          const loan = Object.keys(member.active_loans).map(i => member.active_loans[i]);
          loans.push(...loan);
        }
      });
      return [
        fromActions.upsertMembers({members}),
        loanActions.upsertLoans({loans}),
        fromActions.doneLoadingMembers()
      ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}
}
