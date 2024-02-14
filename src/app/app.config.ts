import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { sessionReducer } from './store/session.state';
// import { NgxStripeModule } from 'ngx-stripe';
// import { environment } from '../environements/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(), provideAnimations(), provideStore({session: sessionReducer})]
};

// NgxStripeModule.forRoot(environment.stripe.publicKey)