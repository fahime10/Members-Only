const Message = require('../models/messageModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.messages_list_get = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().exec();

    // const [allMessages, allUsers] = await Promise.all([
    //     Message.find().exec(),
    //     User.findById().exec()
    // ]);

    res.render('messages', {
        title: 'Members Only Club - Welcome',
        messages_list: allMessages,
        user: res.locals.currentUser
    });
});