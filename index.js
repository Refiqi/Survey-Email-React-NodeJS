const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');


const app = express();

// Database

const mongoose = require('mongoose');
const {mongodbURI} = require('./config/keys');

mongoose.connect(mongodbURI, { useNewUrlParser: true }, (err=>{
    if (err) throw err;
    console.log('Connected to MongoDB');
}));

// Cookie Session
const { cookieKey } = require('./config/keys');

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Load Routes
const index = require('./routes/index');

// Use Routes
app.use('/', index);




const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server Running at Port: ${port}`);
});