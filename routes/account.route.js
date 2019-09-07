const express = require('express');

const controller = require('../controllers/account.controller.js');

let router = express.Router();

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

module.exports = router;