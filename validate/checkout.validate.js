module.exports.checkout = async function(req, res, next){
	// tao mang chua loi
	let errors = [];
	// kiem tra First name
	if(!req.body.firstName){
		errors.push('First name is reqired');
	}
	// kiem tra Last name
	if(!req.body.lastName){
		errors.push('Last name is required');
	}
	// kiem tra Phone number
	if(!req.body.phoneNumber){
		errors.push('Phone number is required');
	}
	// kiem tra dia chi
	if(!req.body.address){
		errors.push('Address is required');
	}
	// kiem tra zip
	if(!req.body.zip){
		errors.push('Zip is required');
	}
	// kiem tra ma code
	if(!req.body.checkCode){
		errors.push('Code is required');
	}
	// kiem tra co loi hay khong
	if(errors.length){
		res.render('carts/checkout', {
			errors: errors,
			values: req.body
		});
		return;
	}

	// neu pass het chuyen qua middleware tiep theo
	next();
}