import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './user/user.reducer';


export interface ApplicationState {

  [fromUser.usersFeatureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<ApplicationState> = {

  [fromUser.usersFeatureKey]: fromUser.reducer,
};


export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [] : [];
