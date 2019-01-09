const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

    googleID: String
    
});

module.exports = mongoose.model('users', UserSchema);