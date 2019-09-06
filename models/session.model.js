const mongoose = require('mongoose');
const Cart = require('../models/cart.model.js');

let sessionSchema = mongoose.Schema({
	sessionId: String,
	cart: Array
});

let Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;
