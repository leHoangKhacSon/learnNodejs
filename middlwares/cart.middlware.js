const Session = require('../models/session.model.js');

module.exports = async function(req, res, next){
	let sessionId = req.signedCookies.sessionId;
	// neu ton tai sessionId tuc la co ton tai sessions
	if(sessionId){
		let countCart = await Session.findOne({sessionId: sessionId});
		// if(countCart.cart.length > 0){
		if(countCart !== null ){
			if(countCart.cart.length > 0){
				res.locals.sumCart = countCart.cart.map(c => c.quantity)
												   .reduce((a, b) => a + b);
			}
		}	
	}
	
	next();
}