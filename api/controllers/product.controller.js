const Product = require('../../models/product.model.js');

module.exports.index = async function(req, res){
	let products = await Product.find();
	res.json(products);
}

module.exports.create = async function(req, res){
	let product = await Product.create(req.body);
	if(product){
		res.json({
			resulut: "oke",
			data: product,
			message: 'insert new product success'
		});
	} else{
		res.json({
			result: 'failer',
			data: {},
			message: 'insert new product failer'
		})
	}
}