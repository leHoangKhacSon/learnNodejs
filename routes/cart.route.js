const express = require('express');

const controller = require('../controllers/cart.controller.js');

const router = express.Router();

router.get('/', controller.carts);

router.get('/add/:productId', controller.addToCart);

router.get('/complete', controller.complete);

module.exports = router;
