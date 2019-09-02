const express = require('express');

const userRoute = require('./routes/user.route.js');

const app = express();
const port = 7000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// cho biet cac file static nam trong folder public
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {title: 'home', message: 'XYZ Team'});
});
// truyen vao path can 
app.use('/users', userRoute);

app.listen(port, () => console.log('Server listening on port ' + port));