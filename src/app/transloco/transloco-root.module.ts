import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  endpoint = `${environment.api}/internationalization`;
  code = environment.code;
  constructor(private http: HttpClient) {}
  getTranslation(lang: string) {
    const url = `./assets/i18n/${lang}.json`;
    return this.http.get<Translation>(url).pipe(tap((response: any) => response));
  }
  // get locals
  // get all locals
  // get locals
  // get Project
}
@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        fallbackLang: 'key',
        defaultLang: 'en-US',
        availableLangs: ['key', 'en-US', 'ar-TN'],
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
