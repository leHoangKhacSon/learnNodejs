const shortId = require('shortid');

const db = require('../db.js');

module.exports = function(req, res, next) {
	// kiểm tra xem có seessionId hay không
	// khi chạy đoạn này nếu bật Devtools google sẽ bỏ qua cookie 
	// và điều kiện luôn true => thêm nhiều sessionId vào db
	if(!req.signedCookies.sessionId) {
		let sessionId = shortId.generate();
		res.cookie('sessionId', sessionId, {
			signed: true
		});
		// thêm sessions và database
		db.get('sessions')
		  .push({ id: sessionId })
		  .write();
	}

	let sessionId = req.signedCookies.sessionId;
	res.locals.countCart = db.get('sessions')
						 .find({id: sessionId})
						 .get('cart')
						 .size()
						 .value();
	next();
};