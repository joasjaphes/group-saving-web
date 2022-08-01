import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from './user.model';

export const getUsers = createAction(
  '[User/API] Get Users'
);

export const addCurrentUser = createAction(
  '[User] Add Current User',
  props<{ currentUser: User }>()
);

export const doneLoadingUsers = createAction(
  '[User/API] Done Loading Users'
);

export const failLoadingUsers = createAction(
  '[User/API] Error Loading Users',
  props<{ error: any }>()
);

export const setSelectedUser = createAction(
  '[User/API] Set Selected Users',
  props<{ userId: string }>()
);

export const setSelectedGroupId = createAction(
  '[User/API] Set Selected Group Id',
  props<{ groupId: string }>()
);

export const loadUsers = createAction(
  '[User/API] Load Users',
  props<{ users: User[] }>()
);

export const addUser = createAction(
  '[User/API] Add User',
  props<{ user: User }>()
);

export const upsertUser = createAction(
  '[User/API] Upsert User',
  props<{ user: User }>()
);

export const addUsers = createAction(
  '[User/API] Add Users',
  props<{ users: User[] }>()
);

export const upsertUsers = createAction(
  '[User/API] Upsert Users',
  props<{ users: User[] }>()
);

export const updateUser = createAction(
  '[User/API] Update User',
  props<{ user: Update<User> }>()
);

export const updateUsers = createAction(
  '[User/API] Update Users',
  props<{ users: Update<User>[] }>()
);

export const deleteUser = createAction(
  '[User/API] Delete User',
  props<{ id: string }>()
);

export const deleteUsers = createAction(
  '[User/API] Delete Users',
  props<{ ids: string[] }>()
);

export const clearUsers = createAction(
  '[User/API] Clear Users'
);

export const logout = createAction(
  '[User/API] Logout'
);
