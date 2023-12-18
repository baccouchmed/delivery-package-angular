import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoService } from '@ngneat/transloco';
import { SharedModule } from './shared/shared.module';
import { ApiErrorsInterceptor } from './shared/interceptors/api-errors.interceptor';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { CoreModule } from './core/core.module';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};
registerLocaleData(localeFr, 'fr-FR');
// Interceptors Provide Array
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiErrorsInterceptor, multi: true },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    // Fuse, FuseConfig & FuseMockAPI
    FuseModule,
    FuseConfigModule.forRoot(appConfig),
    TranslocoRootModule,
    // Core module of your application
    CoreModule,
    MatDialogModule,
    MatSelectModule,
    // Layout module of your application
    LayoutModule,
    SharedModule,
    HttpClientModule,
    MatMenuModule,
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: MAT_DATE_LOCALE,
      deps: [TranslocoService],
      useFactory: (translateService: TranslocoService) => translateService.getActiveLang(),
    },
    {
      provide: LOCALE_ID,
      deps: [TranslocoService],
      useFactory: (translateService: TranslocoService) => translateService.getActiveLang(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
