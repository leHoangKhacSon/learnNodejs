const User = require('../models/user.model.js');
const Product = require('../models/product.model');

module.exports = async function(req, res, next){
	// lay 4 san pham de hien thi len trang chu
	// lay san pham sau do dung vong lap o trang chu de lay id san pham va image san pham
	let product = await Product.findOne({_id: "5d7121bacdd8c57d42be4694"});

	// lay nguoi dung dang dang nhap
	let user = await User.findOne({_id: req.signedCookies.userId});

	if(user){
		res.locals.user = user;
	}
	res.locals.product = product;
	next();
}