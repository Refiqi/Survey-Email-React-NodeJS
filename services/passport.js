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
    callbackURL: '/auth/google/callback',
    proxy: true

}, async (accessToken, refreshToken, profile, done) => {

    const existingUser = await User.findOne({googleID: profile.id})

    if (existingUser) {
        
        done(null, existingUser);

    }
        
    const savedUser = await new User({googleID: profile.id}).save()
    
    done(null, savedUser);

}));