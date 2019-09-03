// chua cac router users
var express = require('express');
var shortid = require('shortid');

const db = require('../db');
const controller = require('../controllers/product.controller.js');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;