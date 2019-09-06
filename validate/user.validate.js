module.exports.postCreate = function(req, res, next){
	// array error
	let errors = [];
	// kiem tra email
	if(!req.body.email){
		errors.push('Email is required');
	}

	// kiem tra password
	if(!req.body.password){
		errors.push('Password is required');
	}
	// kiem tra ten
	if(!req.body.name){
		errors.push('Name is required');
	}

	//kiem tra tuoi
	if(!req.body.age){
		errors.push('Age is required');
	}

	//kiem tra 
	if(errors.length){
		res.render('users/create', {
			errors: errors,
			// biến values chứa kết quả đã nhập
			values: req.body
		});
		return;
	}

	// chuyển 1 biến từ middlware này sang middlware sau
	// res.locals.biến = ....

	next();
}