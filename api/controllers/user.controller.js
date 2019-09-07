const User = require('../../models/user.model.js');

module.exports.index = async function(req, res){
	let users = await User.find();
	res.json(users);
};

module.exports.create = async function(req, res){
	let user = await User.create(req.body);
	if(user){
		res.json({
			result: 'oke',
			data: user,
			message: 'insert success'
		});
	}else {
		res.json({
			result: 'falure',
			data: {},
			message: 'insert failer'
		});
	}
}