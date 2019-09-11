const User = require('../models/user.model.js');

module.exports = async function(req, res, next){
	let user = await User.findOne({_id: req.signedCookies.userId});
	if(user){
		res.locals.user = user;
	}
	next();
}