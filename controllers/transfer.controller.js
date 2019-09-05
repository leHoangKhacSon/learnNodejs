const shortId = require('shortid');

const db = require('../db.js');

module.exports.create = function(req, res, next){
	res.render('transfers/create', {
		// tạo token cho  
		csrfToken: req.csrfToken
	});	
};

module.exports.postCreate = function(req, res, next){
	let data = {
		id: shortId.generate(),
		amount: parseInt(req.body.amount),
		accountId: req.body.account,
		userId: req.signedCookies.userId
	};
	db.get('transfers').push(data).write();
	res.redirect('/transfers/create');
}