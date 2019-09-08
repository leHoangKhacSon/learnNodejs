const Session = require('../models/session.model.js');
const Product = require('../models/product.model.js');

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

	// tim san pham
	let product = await Product.findOne({_id: productId});
	// lay gia san pham
	let price = product.price;

	if(!sessionId){
		res.redirect('/products');
		return;
	}
	// tim sessions co sessionId = sessionId
	let sessions = await Session.findOne({sessionId: sessionId});
	// data la thong tin san pham 
	let data = {
		productId: productId,
		quantity: 1,
		price: price
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

module.exports.complete = async function(req, res, next){
	// let userId = req.signCookies.userId;
	// lay sessionId
	let sessionId = req.signedCookies.sessionId;
	// tim collection session theo sessionId
	let session = await Session.findOne({sessionId: sessionId});
	// lay cac san pham trong cart cho vao mang
	let cartsArray = session.cart;
	// gan bien locals bang tong gia cua tat ca san pham trong cart
	res.locals.priceResult = cartsArray.map(cart=>{
		return cart.price * cart.quantity;
	}).reduce((a, b) => a + b);
	res.locals.productSum = cartsArray.map(cart=>{
		return cart.quantity;
	}).reduce((a,b) => a + b);
	// bat loi
	try{
		// neu nguoi dung chua dang nhap
		if(!req.signedCookies.userId){
			res.redirect('/auth/login');
			return;
		}
		// neu nguoi dung da dang nhap
		else{
			res.render('carts/pay');
			return;
		}
	}catch(error){
		next(error)
	}
	
}