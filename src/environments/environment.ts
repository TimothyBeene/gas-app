// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // googleClientId: '594820868776-75oeoic5ion7f772gnlrvbog7a363skp.apps.googleusercontent.com',
  sheetId: '1HpD_49Y2d2vRfMRmXk8JrNX2LtUfNCIArdZO9fKXHLI',
  googleSheetsBaseUrl: 'https://sheets.googleapis.com/v4/spreadsheets',
  gapiClientConfig: {
    client_id: '594820868776-75oeoic5ion7f772gnlrvbog7a363skp.apps.googleusercontent.com',
    discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
    scope: [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/analytics',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/spreadsheets.readonly'
    ].join(' '),
    ux_mode: 'popup'
  }

};
