import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoHttpRequestModule } from '@po-ui/ng-components';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([
      ProtheusLibCoreModule,
      BrowserAnimationsModule,
      PoHttpRequestModule
    ]),
  ]
};
