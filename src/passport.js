const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config();


passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new GitHubStrategy({
        clientID: process.env.github_client_id,
        clientSecret: process.env.github_client_secret,
        callbackURL: "http://localhost:8080/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));