const User = require("../../models/user.model");

module.exports.postCreate = async function(req, res, next){
    let name = req.body.name;
    let age = req.body.age;
    let email = req.body.email;
    let password = req.body.password;
    let avatar = req.body.avatar;
    let errors = [];

    // let users = await User.find();
    // // lay email
    // let emailUser = users.map(user => user.email);
    
    // kiem tra xem da nhap du thong tin hay chua
    if(!name){
        errors.push('required name');
    }
    if(!age){
        errors.push('required age');
    }
    if(!email){
        errors.push('required email');
    }
    if(!password){
        errors.push('required password');
    }
    if(!avatar){
        errors.push('required avatar')
    }

    // kiem tra xem email nhap vao da ton tai hay chua
    let user = await User.findOne({email: email});
    if(user){
        errors.push('email exists');
    }

    if(errors.length){
        res.json({
            result: "failre",
            errors: errors,
            message: "create account failure"
        });
        return;
    }
    // neu pass het
    let newUser = await User.create(req.body);
    res.json({
        status: "success",
        data: newUser,
        message: "Create success"
    });
}

module.exports.deleteAccount = async function(req, res, next){
    try{
        // lay id nhap vao 
        let _id = req.params.id;
        // tim kiem account
        let account = await User.findOne({_id: _id});
        // kiem tra
        if(account){
            let accountDelete = await User.findByIdAndDelete({_id: _id});
            if(accountDelete){
                res.json({
                    status: "success",
                    data: accountDelete,
                    message: "delete Account success"
                });
            }else {
                res.json({
                    status: "failure",
                    data: "",
                    message: "delete Account failure"
                });
            }
        }else {
            res.json({
                error: "failure",
                message: "not found"
            });
        }


    }catch(error){
        next(
            res.json({
            status: failure,
            error: erros,
            message: "not convert id to hexa code"
            })
        );
    }
}