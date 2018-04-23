// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDHOc3s73v7o4WpWqhmBEn25uVZU9SO8Tk",
    authDomain: "my-angular-fitness-tracker.firebaseapp.com",
    databaseURL: "https://my-angular-fitness-tracker.firebaseio.com",
    projectId: "my-angular-fitness-tracker",
    storageBucket: "my-angular-fitness-tracker.appspot.com",
    messagingSenderId: "77633642710"
  }
};
