// Configure Passport to use Auth0
var Auth0Strategy = require('passport-auth0');
var passport = require('passport');
var strategy = new Auth0Strategy({
    domain:      "zied.eu.auth0.com",
    clientID:    'mJj9pgq1Ht9wxl9IV6IoVPudUwY4fe7A',
    clientSecret: 'TWCRPN3PfBNW439TDJND17iAg_HIyV91qspqcQTayQ2F7i1oPJvh1mJPb86XgP40',
    callbackURL:  'http://localhost:3000/user/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
