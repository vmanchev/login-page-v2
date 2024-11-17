import { createAction, props } from '@ngrx/store';

export const redirectAction = createAction(
  '[Common] Redirect',
  props<{ path: string }>()
);
