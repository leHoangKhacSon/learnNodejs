// chua cac router users
var express = require('express');
var shortid = require('shortid');

const db = require('../db');
const controller = require('../controllers/user.controller.js');

var router = express.Router();

router.get('/', controller.index);
// router tim du lieu
router.get('/search', controller.search);
// router request create 
router.get('/create', controller.create);
// lay du lieu khi co request gui den users co id = ...
router.get('/:id', controller.get);
// router post du lieu khi create
router.post('/create', controller.postCreate);

module.exports = router;