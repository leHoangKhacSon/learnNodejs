const User = require('../models/user.model.js');

module.exports.postCreate = async function(req, res, next){
	let email = req.body.email;
	let password = req.body.password;
	let repassword = req.body.repassword;
	let findEmail = await User.findOne({email: email});
	let errors = [];
	// kiem tra xem da nhap email hay chua
	if(!email){
		errors.push('Email is required')
	}
	// kiem tra xem da nhap password hay chua
	if(!password){
		errors.push('Password is required')
	}
	// kiem tra xem da nhap re-password hay chua
	if(!repassword){
		errors.push('Re-password is required')
	}
	// kiem tra nhap mat khau trung nhau chua
	if(password !== repassword){
		errors.push('Re-password does not match')
	}
	// kiem tra xem email da co trong database hay chua
	if(findEmail){
		errors.push('Email exists')
	}

	// kiem tra xem co loi hay khong
	if(errors.length){
		res.render('accounts/create', {
			errors: errors,
			values: req.body
		});
		return;
	}
	// neu khong co loi chuyen qua controller tiep theo
	next();
};