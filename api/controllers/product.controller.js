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
	// bat loi xem id nhap vao co chuyen qua duoc ma hexa hay khong
	try{
		// lay id nguoi dung put len
		let _id = req.params.id;
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
	}catch(error){
		// let err = "id not converts to objectId hecxa";
		// next(error);
		next(
			res.json({
				result: "error",
				data: "",
				message: "id not converts to objectId hecxa. create product failure"
			})
		);
	}
}

module.exports.deleteProduct = async function(req, res, next){
	try{
		let _id = req.params.id;
		let product = await Product.findOne({_id: _id});
		if(product){
			let data = await Product.findByIdAndDelete({_id: _id});
			if(data){
				res.json({
					result: "delete",
					data: data,
					message: "delete success"
				});
			}else {
				res.json({
					result: "failure",
					require: "please re-enter id or resource",
					messsage: "delete failure"
				})
			}
		}
		else {
			res.json({
				messsage: "not found"
			})
		}
	}catch(error){
		next(
			res.json({
				result: "error",
				require: "please re-enter id or resource",
				message: "id not converts to objectId hecxa. create product failure"
			})
		);
	}
}

