import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { sessionReducer } from './store/session.state';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ConfirmationService, MessageService } from 'primeng/api';
import { loaderInterceptor } from './interceptors/loader.intercecptor';
// import { NgxStripeModule } from 'ngx-stripe';
// import { environment } from '../environements/environment';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['session'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(withInterceptors([loaderInterceptor])), provideAnimations(), provideStore({session: sessionReducer}, { metaReducers }), MessageService, ConfirmationService]
};

// NgxStripeModule.forRoot(environment.stripe.publicKey)