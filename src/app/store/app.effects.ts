import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import {RouterEffects} from './router/router.effect';
import {UserEffects} from './user/user.effects';



export const effects: any[] = [
  RouterEffects,
  UserEffects
];
