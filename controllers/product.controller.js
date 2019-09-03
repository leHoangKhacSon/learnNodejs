const db = require('../db.js');

module.exports.index = function(req, res){
	// lấy về page hiện tại mặc định bằng 1
	let page = parseInt(req.query.page) || 1;
	// 8 sản phẩm trong 1 trang
	let perPage = 8;

	let start = (page -1) * perPage;
	let end = page * perPage;

	// code page-item phân trang
	// đếm tất cả sản phẩm trong csdl
	let product = db.get('products').value().length;
	let maxPage = Math.ceil(product/perPage);
	// tạo mảng - chứa 3 phần tử của page-item
	let pageArray = [];
	if(page <= 1){
		page = 1;
		pageArray = [1, 2, 3];
	}else {if(page >= maxPage){
			pageArray = [maxPage-2, maxPage-1, maxPage];
		}else {
			pageArray = [page-1, page, page+1];
		}}

	// 	
	let drop = (page -1) * perPage;

	res.render('products/index', {
		// cách 1
		// products: db.get('products').value().slice(start, end)
		// cách 2
		products: db.get('products').drop(drop).take(perPage).value(),
		pageArray: pageArray,
		page: page
	});
	// pagination

};