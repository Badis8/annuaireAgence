import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { routes } from './app.routes';
import {KeycloackService} from "./keycloack.service";
export function initApp(keycloackService: KeycloackService) {
  return () => keycloackService.initialize();
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  {
    provide: APP_INITIALIZER,
    useFactory: initApp,
    deps: [KeycloackService],
    multi: true,
  },]
};
