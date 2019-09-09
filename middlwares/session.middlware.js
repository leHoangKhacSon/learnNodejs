const shortId = require('shortid');

const Session = require('../models/session.model.js');

module.exports = async function(req, res, next) {
	// kiểm tra xem có seessionId hay không
	// khi chạy đoạn này nếu bật Devtools google sẽ bỏ qua cookie 
	// và điều kiện luôn true => thêm nhiều sessionId vào db
	if(!req.signedCookies.sessionId) {
		let sessionId = shortId.generate();
		res.cookie('sessionId', sessionId, {
			signed: true
		});
		// thêm sessions và database
		let session = await Session.create({
			sessionId: sessionId,
			cart: []
		})
		// await session.save();
		// db.get('sessions')
		//   .push({ id: sessionId })
		//   .write();
	}

	// let sessionId = req.signedCookies.sessionId;
	// // res.locals.countCart = db.get('sessions')
	// // 					 .find({id: sessionId})
	// // 					 .get('cart')
	// // 					 .size()
	// // 					 .value();
	// let countCart = await Session.findOne({sessionId: sessionId });

	// if(countCart.cart.length > 0){
	// 	res.locals.sumCart = countCart.cart.map(c => c.quantity)
	// 							  		   .reduce((a, b) => a + b);
	// }

	// res.locals.countCart = sessions.cart.length;
	next();
};