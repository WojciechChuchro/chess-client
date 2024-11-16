import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RxStomp } from '@stomp/rx-stomp';

import { routes } from './app.routes';
import { rxStompServiceFactory } from './rxstomp/rx-stomp-factory';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        {
            provide: RxStomp,
            useFactory: rxStompServiceFactory
        },
    ]
};
