const mongoose = require('mongoose');

let transferSchema = mongoose.Schema({
	accountId: String,
	amount: Number,
	userId: String
});

let Transfer = mongoose.model('Transfer', transferSchema, 'transfers');

module.exports = Transfer;