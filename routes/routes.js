const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

router.get('/', index_controller.index);

router.get('/sign-up', user_controller.sign_up_form_get);

router.post('/sign-up', user_controller.sign_up_form_post);

router.get('/log-in', user_controller.login_get);

router.post('/log-in', user_controller.login_post);

// router.get('/logout', user_controller.logout_get);

router.get('/messages', message_controller.messages_list_get);

module.exports = router;