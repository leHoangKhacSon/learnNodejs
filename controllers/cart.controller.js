const Session = require('../models/session.model.js');
const Product = require('../models/product.model.js');
const shortid = require('shortid');

module.exports.carts =  async function(req, res){
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
	let cartsArray = sessions.cart;
	if(cartsArray.length > 0){
		res.locals.priceSum = cartsArray.map(c => c.quantity * c.priceProduct)
								.reduce((a, b) => a + b);
		res.locals.productSum = cartsArray.map(cart => cart.quantity)
								.reduce((a, b) => a + b);
	}

	let productIdArray = cartsArray.map(c => c.productId);
	let products = await Product.find();
	res.locals.products = products.filter(product => productIdArray.indexOf(product._id) !== -1);
	res.locals.cartsArray = cartsArray;

	res.render('carts/index', {
		// cartsArr: await sessions.cart
		sessions
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
		priceProduct: price,
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


	res.redirect(req.baseUrl);
};

module.exports.checkout = async function(req, res, next){
		// let userId = req.signCookies.userId;
	// lay sessionId
	let sessionId = req.signedCookies.sessionId;
	// tim collection session theo sessionId
	let session = await Session.findOne({sessionId: sessionId});
	// lay cac san pham trong cart cho vao mang
	let cartsArray = session.cart;
	// gan bien locals bang tong gia cua tat ca san pham trong cart
	if(cartsArray.length > 0){
		res.locals.priceSum = cartsArray.map(cart=>{
			return cart.priceProduct * cart.quantity;
		}).reduce((a, b) => a + b);
		res.locals.productSum = cartsArray.map(cart=>{
			return cart.quantity;
		}).reduce((a,b) => a + b);
	}

	// bat loi
	try{
		// neu nguoi dung chua dang nhap
		if(!req.signedCookies.userId){
			res.redirect('/auth/login');
			return;
		}
		// neu nguoi dung da dang nhap
		else{
			res.render('carts/checkout');
			return;
		}
	}catch(error){
		next(error)
	}
}

module.exports.pay = async function(req, res, next){
	// // lay ma code nguoi dung nhap vao
	// let code = req.body.checkCode;
	// // kiem tra ma code
	// let check = await Session.find({checkCode: code})
	// // neu dung hoan cho phep Pay now
	// if(!check){
	// 	res.dedirect('/cart/checkout');
	// }
	// // neu khong dung thi nhap lai
	res.render('carts/pay');
}

module.exports.checkcode = async function(req, res, next){
	// tao ma code moi gui ve phone nguoi dung
	let checkCode = shortid.generate();
	// lay id sessions nguoi dung hien tai
	let sessionId = req.signedCookies.sessionId;
	// them ma code vao database
	let Code = await Session.findOneAndUpdate({sessionId: sessionId}, {checkCode: checkCode});
	// tiep tuc checkout
	res.redirect('/cart/checkout');
}

module.exports.postCheckout = async function(req, res, next){
	// lay ma nguoi dung nhap vao
	let checkCode = req.body.checkCode;
	// tim trong database
	let check = await Session.findOne({checkCode: checkCode});
	// kiem tra xem ton tai hay khong
	if(!check){
		res.redirect('/cart/checkout');
		return;
	}
	// neu ton tai chuyen sang trang pay
	res.render('carts/pay');
}

module.exports.deleteProduct = async function(req, res, next){
	// lay sessionId cua nguoi dung hien tai
	let sessionId = req.signedCookies.sessionId;
	// lay id san pham can xoa
	let productId = req.params.id;
	// lay session hien tai
	let session = await Session.findOne({sessionId: sessionId});
	// lay ra san pham cua nguoi dung hien tai
	let cartsArray = session.cart;
	let productDel = cartsArray.map(function(cart){
		if(cart.productId === productId){
			return cart;
		}	
	});
	cartsArray.splice(cartsArray.indexOf(productDel), 1);

	let newSession = await Session.findOneAndUpdate({sessionId: sessionId}, {cart: cartsArray});

	res.redirect('/cart');
}