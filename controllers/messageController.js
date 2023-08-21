const Message = require('../models/messageModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.messages_list_get = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().populate('user').exec();

    res.render('messages', {
        title: 'Members Only Club - Welcome,',
        messages_list: allMessages,
        user: res.locals.currentUser
    });
});

exports.messages_create_get = asyncHandler(async (req, res, next) => {
    res.render('message_form', { title: 'Members Club Only - Create a new message', user: res.locals.currentUser });
});

exports.messages_create_post = [
    body('title')
        .trim()
        .escape(),

    body('text')
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            user: req.body.user,
            title: req.body.title,
            text: req.body.text,
        });

        if (!errors.isEmpty()) {
            res.render('message_form', {
                title: 'Members Club Only - Create a new message', 
                user: res.locals.currentUser,
                message: message,
                errors: errors.array() 
            });
            return;
        } else {
            await message.save();
            res.redirect('/messages');
        }
    }),
];
