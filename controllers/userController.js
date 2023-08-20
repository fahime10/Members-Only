const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.sign_up_form_get = asyncHandler(async (req, res, next) => {
    res.render('sign_up_form', { title: 'Members Only Club - Sign up form' });
});

exports.sign_up_form_post = [
    body('first_name')
        .trim()
        .escape(),

    body('last_name')
        .trim()
        .escape(),

    body('username')
        .custom(async value => {
            const username = await User.find({ username: value });
            if (username) {
                throw new Error('Username already in use');
            }
        })
        .trim()
        .escape(),

    body('password', 'Password must be at least 4 characters long')
        .trim()
        .isLength({ min: 4 })
        .escape(),

    body('confirm-password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match')
            }
        })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        let password = req.body.password;

        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                return;
            } else {
                const user = new User({
                    firstName: req.body.first_name,
                    lastName: req.body.last_name,
                    username: req.body.username,
                    password: hashedPassword
                });

                if(!errors.isEmpty()) {
                    res.render('sign_up_form', {
                        title: 'Members Only Club - Sign up form',
                        user: user,
                        errors: errors.array(),
                    });
                    return;
                } else {
                    await user.save();
                    res.redirect('/');
                }
            }
        });
    }),
]