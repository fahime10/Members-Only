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

router.get('/logout', user_controller.logout);

router.get('/messages', message_controller.messages_list_get);

router.get('/membership', user_controller.membership_get);

router.post('/membership', user_controller.membership_post);

router.get('/messages/create', message_controller.messages_create_get);

router.post('/messages/create', message_controller.messages_create_post);

router.get('/admin', user_controller.admin_get);

router.post('/admin', user_controller.admin_post);

router.get('/messages/delete/:id', message_controller.message_delete_get);

router.post('/messages/delete/:id', message_controller.message_delete_post);

module.exports = router;