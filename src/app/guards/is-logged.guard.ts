import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';

export const isLoggedGuard: CanActivateFn = (route, state) => {

  const store = inject(Store<{session: { token: string }}>);
  const router = inject(Router);

  const token$: Observable<string|null> = store.select(state => state.session.token)

  return token$.pipe(
    map(t => !!t),
    tap(isConnected => { 
      if(!isConnected) 
        router.navigate(['authentification']);
    })
  );
};
