const db = require('../db.js');

module.exports.carts = function(req, res){
	let sessionId = req.signedCookies.sessionId;
	let carts = db.get('sessions')
				  .find({id: sessionId})
				  .get('cart')
				  .value();
	// chuyển từ object thành array 
	// {key: value} => [[key, value]]
	let cartsArr = Object.entries(carts);
	res.render('carts/index', {
		cartsArr: cartsArr
	});
};

module.exports.addToCart = function(req, res, next){
	// lay productID
	let productId = req.params.productId;
	let sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}

	// lay gia tri ban dau
	let count = db.get('sessions')
		  .find({id: sessionId})
		  .get('cart.' + productId, 0)
		  .value();
	// them vao db
	db.get('sessions')
	  .find({id: sessionId})
	  .set('cart.' + productId, count + 1)
	  .write();

	res.redirect('/products');
};