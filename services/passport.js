const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
    googleClientID,
    googleClientSecret
} = require('../config/keys');

// Passport Google

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.use(new GoogleStrategy({

    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'

}, (accessToken, refreshToken, profile, done) => {

    User.findOne({googleID: profile.id}).then(existingUser=>{

        if (existingUser) {
            done(null, existingUser);
        } else {
            
            new User({googleID: profile.id})
            
             .save()
            .then(savedUser=>{
                done(null, savedUser);
            });

        }
    });
}));