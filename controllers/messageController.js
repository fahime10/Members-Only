const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.messages_list_get = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().exec();

    res.render('messages', {
        title: 'Members Only Club - Welcome',
        messages_list: allMessages,
        user: res.locals.currentUser
    });
});