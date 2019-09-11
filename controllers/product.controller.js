// const db = require('../db.js');

// module.exports.index = function(req, res){
// 	// lấy về page hiện tại mặc định bằng 1
// 	let page = parseInt(req.query.page) || 1;
// 	// 8 sản phẩm trong 1 trang
// 	let perPage = 8;

// 	let start = (page -1) * perPage;
// 	let end = page * perPage;

// 	// code page-item phân trang
// 	// đếm tất cả sản phẩm trong csdl
// 	let product = db.get('products').value().length;
// 	let maxPage = Math.ceil(product/perPage);
// 	// tạo mảng - chứa 3 phần tử của page-item
// 	let pageArray = [];
// 	if(page <= 1){
// 		page = 1;
// 		pageArray = [1, 2, 3];
// 	}else {if(page >= maxPage){
// 			pageArray = [maxPage-2, maxPage-1, maxPage];
// 		}else {
// 			pageArray = [page-1, page, page+1];
// 		}}

// 	// 	
// 	let drop = (page -1) * perPage;

// 	res.render('products/index', {
// 		// cách 1
// 		// products: db.get('products').value().slice(start, end)
// 		// cách 2
// 		products: db.get('products').drop(drop).take(perPage).value(),
// 		pageArray: pageArray,
// 		page: page
// 	});
// 	// pagination

// };

const Product = require('../models/product.model');
const Session = require('../models/session.model.js');

module.exports.index = async function(req, res){
	// lay ve trang hien tai, mac dinh bang 1
	let page = parseInt(req.query.page) || 1;
	// 8 san pham trong 1 trang
	let perPage = 4;
	let skipPage = (page - 1) * perPage;

	let product = await Product.find();
	let maxPage = Math.ceil((product.length)/perPage);
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

	// them await truoc promise
	// lay tat ca products trong database sau do phan trang
	let products = await Product.find().limit(perPage).skip(skipPage);

	res.render('products/index', {
		products: products,
		page: page,
		pageArray: pageArray
	});
};	

module.exports.search = async function(req, res, next){
	// lay ve trang hien tai, mac dinh bang 1
	let page = parseInt(req.query.page) || 1;
	let q = req.query.q;
	let qr = 'q=' + q;
	// 8 san pham trong 1 trang
	let perPage = 8;
	let start = (page - 1) * perPage;
	let end = page * perPage;
	
	let productsArray = await Product.find();
	let products = productsArray.filter(function(product){
		return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	let maxPage = Math.ceil((products.length)/perPage);
	// tạo mảng - chứa 3 phần tử của page-item
	let pageArray = [];
	if(page <= 1 || maxPage < 3){
		page = 1;
		pageArray = [1, 2, 3];
	}else {if(page >= maxPage){
			pageArray = [maxPage-2, maxPage-1, maxPage];
		}else {
			pageArray = [page-1, page, page+1];
		}}

	res.render('products/search', {
		products: products.slice(start, end),
		page: page,
		pageArray: pageArray,
		qr: qr
	});
}

module.exports.details = async function(req, res, next){
	// lay id san pham tren url
	let _id = req.params.id;
	// lay sessionId
	let sessionId = req.signedCookies.sessionId;

	let sessions = await Session.findOne({sessionId: sessionId});
	// lay cac san pham dang co trong gio hang
	let cartsArray = sessions.cart;
	if(cartsArray.length > 0){
		res.locals.priceSum = cartsArray.map(cart => cart.priceProduct * cart.quantity)
										.reduce((a, b) => a + b);
		res.locals.productSum = cartsArray.map(cart => cart.quantity)
										  .reduce((a, b) => a + b);
	}


	// tim san pham trong product collection
	let product = await Product.findOne({_id: _id});
	res.render('products/details', {
		product: product
	});
}