// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// AMBIENTE DEV
// ng serve --configuration=dev
// ng build --configuration=dev
export const environment = {
  production: false,
  URL_SERVICIOS: 'https://dev.devfactorgfc.com/api/v1',
  SECRET_KEY: '71e141d3a016ffd6bd94558a5bb80b15'

};
