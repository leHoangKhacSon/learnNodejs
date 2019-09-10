const express = require('express');

const controller = require('../controllers/cart.controller.js');

const router = express.Router();

router.get('/', controller.carts);

router.get('/add/:productId', controller.addToCart);

router.get('/checkout', controller.checkout);

router.get('/pay', controller.pay);

module.exports = router;
