const User = require('../models/userModel');
const passport = require('passport');
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
            const user = await User.findOne({ username: `${value}` });
            if (user) {
                throw new Error('Username already in use');
            }
        })
        .trim()
        .escape(),

    body('password', 'Password must be at least 4 characters long')
        .trim()
        .isLength({ min: 4 })
        .escape(),

    body('confirm-password', 'Passwords do not match')
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        try {
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
        } catch(err) {
            return next(err);
        }
    }),
];

exports.login_get = (req, res) => {
    if (res.locals.currentUser) {
        res.redirect('/messages');
    }

    res.render('login_form', { title: "Login" });
}

exports.login_post = 
    passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/log-in'
});

exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err);
        }
        res.redirect('/');
    });
}

exports.membership_get = (req, res, next) => {
    res.render('membership', { title: 'Members Only Club - Membership', user: res.locals.currentUser });
}

exports.membership_post = asyncHandler(async (req, res, next) => {
    const trueSecret = process.env.SECRET_PASSCODE;

    if (req.body.secret === trueSecret) {
        await User.findOneAndUpdate({ username: req.body.username }, { member: true });
        res.redirect('/messages');
    }
    res.redirect('/messages');
});

exports.admin_get = (req, res, next) => {
    res.render('admin', { title: 'Members Only Club - Admin', user: res.locals.currentUser });
}

exports.admin_post = asyncHandler(async (req, res, next) => {
    const adminSecret = process.env.ADMIN_PASSCODE;

    if (req.body.admin_secret === adminSecret) {
        await User.findOneAndUpdate({ username: req.body.username }, { admin: true });
        res.redirect('/messages');
    }
});
