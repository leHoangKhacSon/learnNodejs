const db = require('../db.js');

module.exports.requireAuth = function(req, res, next){
	// kiểm tra có cookie gửi lên server hay không
	if(!req.cookies.userId){
		res.redirect('/auth/login');
		return;
	}
	// check cookie đúng hay không
	let user = db.get('users').find({id: req.cookies.userId}).value();
	// kiểm tra
	if(!user){
		res.redirect('/auth/login');
		return;
	}
	// nếu tìm được cookie chuyển qua middware tiếp theo
	next();
};