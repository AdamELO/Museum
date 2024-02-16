import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';

export const isAdminGuard: CanActivateFn = (route, state) => {

  const store = inject(Store<{session: { token: string }}>);
  const router = inject(Router);
  const role$: Observable<string|null> = store.select(state => state.session.role)
  
  return role$.pipe(
    map(r => r == 'Admin'),
    tap(isAdmin => {
      if(!isAdmin) 
        router.navigate(['/']);
    })
  );
};
