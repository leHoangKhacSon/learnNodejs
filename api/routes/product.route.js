const express = require('express');

const controller = require('../controllers/product.controller.js');

let router = express.Router();

router.get('/', controller.index);

router.post('/', controller.create);

router.put('/', controller.putProduct);

router.delete('/', controller.deleteProduct);

module.exports = router;