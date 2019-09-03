const db = require('../db.js');

module.exports.requireAuth = function(req, res, next){
	// kiểm tra có cookie gửi lên server hay không
	if(!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}
	// check cookie đúng hay không
	let user = db.get('users').find({
		id: req.signedCookies.userId
	}).value();
	// kiểm tra
	if(!user){
		res.redirect('/auth/login');
		return;
	}
	// gán biến user bằng user để sử dụng lại
	res.locals.user = user;
	// nếu tìm được cookie chuyển qua middware tiếp theo
	next();
};