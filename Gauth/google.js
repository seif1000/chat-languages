

const { google }  = require("googleapis");
const key = require('../config/config');

const googleConfig = {
  clientId:key.googleID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: key.googlSecret, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: `${key.domain}oauthCallback`, // this must match your google api settings
};

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

//AIzaSyDNvRw7DrQO3WNVyhrOxKqZDCCmACswkV0

const  createConnection = ()=> {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}




const  urlGoogle = ()=> {
  const auth = createConnection();
  const url =  getConnectionUrl(auth);
  return url;
}

module.exports = {
  urlGoogle,
  createConnection,

}