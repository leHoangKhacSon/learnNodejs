const db = require('../db.js');

module.exports.index = function(req, res){
	// lấy về page hiện tại mặc định bằng 1
	let page = parseInt(req.query.page) || 1;
	// 8 sản phẩm trong 1 trang
	let perPage = 8;

	let start = (page -1) * perPage;
	let end = page * perPage;

	let drop = (page -1) * perPage;

	res.render('products/index', {
		// cách 1
		// products: db.get('products').value().slice(start, end)
		// cách 2
		products: db.get('products').drop(drop).take(perPage).value()
	});
};