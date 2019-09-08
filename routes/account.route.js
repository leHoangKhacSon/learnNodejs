const express = require('express');

const controller = require('../controllers/account.controller.js');
const validate = require('../validate/account.validate.js');

let router = express.Router();

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;