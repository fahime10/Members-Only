const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String,  minLength: 1, required: true },
    lastName: { type: String,  minLength: 1, required: true },
    username: { type: String, minLength: 1, maxLength: 20, required: true },
    password: { type: String, required: true },
    member: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
