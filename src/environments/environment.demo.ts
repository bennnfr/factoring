// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// AMBIENTE DEMO
// ng serve --configuration=demo
// ng build --configuration=demo
export const environment = {
  production: false,
  URL_SERVICIOS: 'https://demo.devfactorgfc.com/api/v1',
  SECRET_KEY: 'd88577bea5ba12e079a5ccd3c2face64'

};
