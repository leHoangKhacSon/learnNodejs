const db = require('../db.js');

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
	// nếu sai mật khẩu
	if(user.password !== req.body.password){
		res.render('auth/login', {
			errors: [
				'sai mật khẩu'
			]
		});
		return;
	}
	// nếu pass hết
	// set cookie
	res.cookie('userId', user.id);

	res.redirect('/users');
};