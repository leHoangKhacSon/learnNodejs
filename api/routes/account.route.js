const express = require('express');

const controller = require('../controllers/account.controller');

const router = express.Router();

router.post('/create', controller.postCreate);

router.delete('/delete/:id', controller.deleteAccount);

module.exports = router;