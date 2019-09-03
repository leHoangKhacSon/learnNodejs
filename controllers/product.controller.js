const db = require('../db.js');

module.exports.index = function(req, res){
	res.render('products/index', {
		products: db.get('products').value()
	});
};