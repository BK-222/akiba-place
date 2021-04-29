const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const MainController = require('../controllers/main.js');

router.get('/', MainController.getMain);

router.post('/', MainController.postMain);

router.get('/location', MainController.getLocation);

router.get('/book', MainController.getBook);

router.post('/book', MainController.postBook);

router.post('/members/signup', MainController.memberSignUp);

router.post('/members/login', MainController.memberLogIn);

router.get('/members/status', MainController.statusPage);

router.post('/members/status', isAuth, MainController.getUserStatus);

router.patch('/members/status', isAuth, MainController.updateUserStatus);

router.get('/members/secret', isAuth, MainController.secretMessage);

module.exports = router;