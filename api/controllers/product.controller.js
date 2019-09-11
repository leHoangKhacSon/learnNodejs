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

module.exports.putProduct = async function(req, res, next){
	// lay id nguoi dung put len
	let _id = req.body._id;
	// tim xem da co san pham hay chua
	let product = await Product.findOne({_id: _id});
	if(product){
		let newProduct = await Product.findByIdAndUpdate({_id: _id}, {
			name: req.body.name,
			price: req.body.price,
			image: req.body.image,
			description: req.body.description
		});
		if(newProduct){
			res.json({
				result: "edit",
				data: newProduct,
				message: "edit product success"
			});
		} else {
			res.json({
				result: "edit failure",
				data: "",
				message: "edit product failure"
			});
		}
		
	} 
	else {
		let newProduct = await Product.create({
			name: req.body.name,
			price: req.body.price,
			image: req.body.image,
			description: req.body.description
		});

		if(newProduct){
			res.json({
				result: "create",
				data: newProduct,
				message: "create product success"
			});
		} else {
			res.json({
				result: "create failure",
				data: "",
				message: "create product failure"
			});
		}
	}
}

