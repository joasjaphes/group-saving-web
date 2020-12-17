import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './announcement.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class AnnouncementEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getAnnouncements),
    switchMap((action) => this.offlineService.getItems(DataKeys.Announcement)),
    switchMap(announcements => [
      fromActions.loadAnnouncements({announcements}),
      fromActions.doneLoadingAnnouncements()
    ])
  ), { dispatch: false });


  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
