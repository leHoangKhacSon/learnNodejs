const mongoose = require('mongoose');

let sessionSchema = mongoose.Schema({
	sessionId: String,
	cart: Array,
	checkCode: String
});

let Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;
