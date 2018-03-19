export const environment = {
  production: true,
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
