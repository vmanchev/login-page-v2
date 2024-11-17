import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { redirectAction } from './common.actions';
import { Router } from '@angular/router';

@Injectable()
export class CommonEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(redirectAction),
        tap(({ path }) => {
          this.router.navigate([path]);
        })
      ),
    { dispatch: false }
  );
}
