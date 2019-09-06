const Session = require('../models/session.model.js');

module.exports.carts = async function(req, res){
	let sessionId = req.signedCookies.sessionId;
	// tim sessions co sessionId = sessionId
	let sessions = await Session.findOne({sessionId: sessionId});

	// let carts = db.get('sesssions')
	// 			  .find({id: sessionId})
	// 			  .get('cart')
	// 			  .value();
	// // chuyển từ object thành array 
	// // {key: value} => [[key, value]]
	// let cartsArr = Object.entries(carts);
	res.render('carts/index', {
		// cartsArr: await sessions.cart
		sessions: sessions
	});
};

module.exports.addToCart = async function(req, res, next){
	// lay productID
	let productId = req.params.productId;
	let sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}
	// tim sessions co sessionId = sessionId
	let sessions = await Session.findOne({sessionId: sessionId});
	// data la thong tin san pham 
	let data = {
		productId: productId,
		quantity: 1
	};
	// tim xem da them san pham co productId vao cart chua
	let findCart = sessions.cart.find(c=>{
		return c.productId === productId
	})
	// neu chua thi them san pham vao voi quantity = 1
	if(!findCart){
		sessions.cart.push(data);
		await Session.findOneAndUpdate({sessionId: sessionId}, {cart: sessions.cart});
	}
	// nguoc lai update san pham quantity + 1
	else{
		// tim index cua san pham trong cart
		let indexCart = sessions.cart.indexOf(findCart);
		// tang quantity len 1
		findCart.quantity = findCart.quantity + 1;
		// update san pham voi quatity da tang len 1
		sessions.cart[indexCart] = findCart;
		// update vao database
		await Session.findOneAndUpdate({sessionId: sessionId}, {cart: sessions.cart});
	}
	

	


	// // lay gia tri ban dau
	// let count = db.get('sessions')
	// 	  .find({id: sessionId})
	// 	  .get('cart.' + productId, 0)
	// 	  .value();
	// // them vao db
	// db.get('sessions')
	//   .find({id: sessionId})
	//   .set('cart.' + productId, count + 1)
	//   .write();


	res.redirect('/products');
};