const mongoose = require('mongoose');

let infoSchema = mongoose.Sechema({
	userId: String,
	name: String,
	age: Number,
	avatar: String,
	gender: String,
	address: String,
	phone: String
});

let Info = mongoose.model('Info', infoSchema, 'infomations');

module.exports = Info;