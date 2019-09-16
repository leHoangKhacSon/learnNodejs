// // chua cac function xu ly users
// var db = require('../db');
// var shortid = require('shortid');
// // exports function index
// module.exports.index = function(req, res){
// 	res.render('users/index', {
// 		users: db.get('users').value()
// 	});
// }; 
// // exports function search
// module.exports.search = function(req, res){
// 	let q = req.query.q;
// 	let matchedUsers = db.get('users').value().filter(function(user){
// 		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
// 	});
// 	res.render('users/index', {
// 		users: matchedUsers
// 	});
// };
// // exports function create
// module.exports.create = function(req, res){
// 	res.render('users/create')
// };
// // exports function get
// module.exports.get = function(req, res){
// 	// tim id dua vao req.params
// 	let id = req.params.id;
// 	// tim user dua vao id tren
// 	const user = db.get('users').find({id: id}).value();
// 	res.render('users/view', {
// 		user: user
// 	});
// };
// // exports function postCreate
// module.exports.postCreate = function(req, res){
// 	// tao id ngau nhien cho req.body
// 	req.body.id = shortid.generate();
// 	// lưu đường dẫn vào database
// 	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
// 	// them du lieu vao database
// 	db.get('users')
// 	  .push(req.body)
// 	  .write();
// 	res.redirect('/users')
// };

const User = require('../models/user.model.js');

module.exports.index = async function(req, res){
	let users = await User.find();
	res.render('users/index', {
		users
	});
};

module.exports.search = async function(req, res){
	let q = req.query.q;
	let users = await User.find();
	let matchedUsers = users.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	res.render('users/info', {
		users: matchedUsers
	})
};

module.exports.create = function(req, res){
	res.render('users/create');
};

module.exports.get = async function(req, res){
	let id = req.params.id;
	let user = await User.findById(id);
	res.render('users/view', {
		user
	});
};

module.exports.postCreate = async function(req, res){
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	// let users = new User(req.body);
	// await users.save();
	await User.create(req.body);
	res.redirect('/users');
};