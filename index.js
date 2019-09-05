require('dotenv').config();
console.log(process.env.SESSION_SECRET);

const express = require('express');
var cookieParser = require('cookie-parser');
// const shortid = require('shortid');
const csurf = require('csurf');

const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');
const productRoute = require('./routes/product.route.js');
const cartRoute = require('./routes/cart.route.js');
const transferRoute = require('./routes/transfer.route.js');

const authMiddlware = require('./middlwares/auth.middlware.js');
const sessionMiddlware = require('./middlwares/session.middlware.js'); 

const app = express();
const port = 7000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(cookieParser(shortid.generate());
// sử dụng biến môi trường thay vì dùng shorid.generate()
app.use(cookieParser(process.env.SESSION_SECRET));
// set vào để kiểm tra cho mọi đường dẫn
app.use(sessionMiddlware);

// cho biet cac file static nam trong folder public
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {title: 'home', message: 'XYZ Team'});
});
// truyen vao path can 
app.use('/users', authMiddlware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfers', authMiddlware.requireAuth, transferRoute);
// đặt csurf cuối cùng vì nếu khô
app.use(csurf({ cookie: true}));

app.listen(port, () => console.log('Server listening on port ' + port));