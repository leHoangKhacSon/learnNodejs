// const shortId = require('shortid');

// const db = require('../db.js');

const Transfer = require('../models/transfer.model.js');

module.exports.create = function(req, res, next){
	res.render('transfers/create', {
		// tạo token cho  
		csrfToken: req.csrfToken
	});	
};

module.exports.postCreate = async function(req, res, next){
	let data = new Transfer({
		amount: parseInt(req.body.amount),
		accountId: req.body.account,
		userId: req.signedCookies.userId
	});
	await data.save();
	res.redirect('/transfers/create');
}