const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, minLength: 1, maxLength: 100 },
    text: { type: String, required: true, minLength: 1, maxLength: 1000 },
    timestamp: { type: Date, default: Date.now, required: true } 
});

MessageSchema.virtual('date').get(function () {
    return DateTime.fromJSDate(this.timestamp).toFormat('yyyy-MM-dd, HH:mm');
});

module.exports = mongoose.model('Message', MessageSchema);
