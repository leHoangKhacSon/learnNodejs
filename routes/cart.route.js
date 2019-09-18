const express = require('express');

const validate = require('../validate/checkout.validate.js');
const controller = require('../controllers/cart.controller.js');
const middleware = require('../middlwares/auth.middlware');

const router = express.Router();

router.get('/', controller.carts);

router.get('/add/:productId', controller.addToCart);

router.get('/checkout', middleware.requireAuth, controller.checkout);

router.get('/pay', middleware.requireAuth, controller.pay);

router.post('/checkout', middleware.requireAuth, validate.checkout, controller.postCheckout);

router.post('/checkcode', middleware.requireAuth, controller.checkcode);

router.get('/delete/:id', controller.deleteProduct);

router.get('/deleteOne/:id', controller.deleteOne);

module.exports = router;
