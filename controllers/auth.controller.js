const db = require('../db.js');
const md5 = require('md5');

module.exports.login = function(req, res){
	res.render('auth/login');
};

module.exports.postLogin = function(req, res){
	// lấy email người dùng nhập
	let email = req.body.email;
	// tìm email trong db
	let user = db.get("users").find({email: email}).value();
	// nếu người dùng k tồn tại
	if(!user){
		res.render('auth/login', {
			errors: [
				'User không tồn tại'
			]
		});
		return;
	}
	// mã hóa mật khẩu người dùng nhập vào
	let hashPassword = md5(req.body.password);
	// nếu sai mật khẩu
	if(user.password !== hashPassword){
		res.render('auth/login', {
			errors: [
				'sai mật khẩu'
			]
		});
		return;
	}
	// nếu pass hết
	// set cookie
	res.cookie('userId', user.id, {
		signed: true
	});

	res.redirect('/users');
};