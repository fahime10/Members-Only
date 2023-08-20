const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true, minLength: 1 },
    lastName: { type: String, required: true, minLength: 1 },
    username: { type: String, required: true, minLength: 1, maxLength: 20 },
    password: { type: String, required: true },
    member: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
