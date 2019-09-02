// chua cac router users
var express = require('express');

const controller = require('../controllers/auth.controller.js');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;