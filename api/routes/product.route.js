const express = require('express');

const controller = require('../controllers/product.controller.js');

let router = express.Router();

router.get('/', controller.index);

router.post('/', controller.create);

router.put('/:id', controller.putProduct);

router.delete('/:id', controller.deleteProduct);

router.patch('/:id', controller.patchProduct);

module.exports = router;