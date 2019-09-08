const User = require('../models/user.model.js');

module.exports.create = function(req, res){
	res.render('accounts/create');
};

module.exports.postCreate = async function(req, res){
	// account moi email + password
	let data = {
		email: req.body.email,
		password: req.body.password
	}
	// tao account moi
	let user = await User.create(data);
	// chuyen ve trang chu
	res.redirect('/');
}