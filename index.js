const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
    googleClientID,
    googleClientSecret
} = require('./config/keys');
const app = express();


// Passport Google

passport.use(new GoogleStrategy({

    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'

}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

}));

app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));


app.get('/auth/google/callback', passport.authenticate('google'));



const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server Running at Port: ${port}`);
});