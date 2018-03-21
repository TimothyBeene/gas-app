# GasApp
App for tracking gas consumption

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## TODOs
* [x] Collect data from user via form
* [x] Store data in local storage
* [x] Store data on Google sheets using user token
* [x] Refactor Oauth2
    * [x] Store clientId in environment file
    * [x] provide new http service that injects token header
    * [x] have http service refresh token when needed
* [ ] general error banner component
    * [ ] take message and show to user
    * [ ] hide after set timeout or on 'x' click
* [ ] Fix service worker for /gas-app base url
* [ ] Create spread sheet on user's google drive
    * [ ] Add header row with field names
    * [ ] give it hardcoded name
    * [ ] look for hardcoded spreadsheet name
* [ ] Load existing spread sheet from user's google drive
