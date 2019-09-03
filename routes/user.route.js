// chua cac router users
var express = require('express');
const multer = require('multer');

const db = require('../db');
const validate = require('../validate/user.validate.js');
const controller = require('../controllers/user.controller.js');

// tạo folder để lưu ảnh đã upload với đường dẫn public/uploads
const upload = multer({dest: 'public/uploads'});

var router = express.Router();

router.get('/', controller.index);
// router tim du lieu
router.get('/search', controller.search);
// router request create 
router.get('/create', controller.create);
// lay du lieu khi co request gui den users co id = ...
router.get('/:id', controller.get);
// router post du lieu khi create
router.post('/create',
	// upload ảnh - tên phải trùng với tên field bên html
 upload.single('avatar'),
 validate.postCreate,
 controller.postCreate
 );

module.exports = router;