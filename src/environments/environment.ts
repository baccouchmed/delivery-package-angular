// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url = window.location.href;
const formatUrl = new URL(url);
const isMobile = !formatUrl.origin.includes('localhost');
export const env = '';
export const environment = {
  host: formatUrl.origin,
  production: false,
  api: isMobile ? `${formatUrl.origin}/api` : '/api',
  code: 'dln',
  env: 'LOCAL',
  services: {
    i18n: {
      url: 'https://i18n-nova.dev.tic-nova.com/api',
    },
    auth: {
      url: `https://auth-nova.dev.tic-nova.com/api`,
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as zone.run, zoneDelegate.invokeTask.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
