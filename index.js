const express = require('express');
var cookieParser = require('cookie-parser');
const shortid = require('shortid');

const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');
const authMiddlware = require('./middlwares/auth.middlware.js');

const app = express();
const port = 7000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(shortid.generate()));

// cho biet cac file static nam trong folder public
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {title: 'home', message: 'XYZ Team'});
});
// truyen vao path can 
app.use('/users', authMiddlware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log('Server listening on port ' + port));