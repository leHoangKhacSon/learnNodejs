const User = require('../models/user.model.js');

module.exports.create = function(req, res){
	res.render('accounts/create');
};

module.exports.postCreate = async function(req, res){
	let email = req.body.email;
	let password = req.body.password;
	// kiem tra xem da nhap email hay chua
	if(!email){
		res.render('accounts/create', {
			errors: [
				'require email'
			]
		});
		return;
	}
	// kiem tra xem da nhap password hay chua
	if(!password){
		res.render('accounts/create', {
			errors: [
				'require password'
			]
		});
		return;
	}
	// kiem tra xem email da co trong database hay chua
	let findEmail = await User.findOne({email: email});

	if(findEmail){
		res.render('accounts/create', {
			errors: [
				'email exists'
			]
		});
		return;
	}

	let user = await User.create(req.body);
	res.redirect('/');
}