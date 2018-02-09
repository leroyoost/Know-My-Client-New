// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDO4-QD6D_ymSs5MkSoHu7EE_BRsgCKEbQ",
    authDomain: "knowmyclienttest.firebaseapp.com",
    databaseURL: "https://knowmyclienttest.firebaseio.com",
    projectId: "knowmyclienttest",
    storageBucket: "knowmyclienttest.appspot.com",
    messagingSenderId: "928891964975"
  }
}