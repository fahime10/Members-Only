const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().exec();

    res.render('index', {
        title: 'Members Only Club',
        messages_list: allMessages,
    });
});