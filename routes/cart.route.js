const express = require('express');

const validate = require('../validate/checkout.validate.js');
const controller = require('../controllers/cart.controller.js');

const router = express.Router();

router.get('/', controller.carts);

router.get('/add/:productId', controller.addToCart);

router.get('/checkout', controller.checkout);

router.get('/pay', controller.pay);

router.post('/checkout', validate.checkout, controller.postCheckout);

router.post('/checkcode', controller.checkcode);

module.exports = router;
