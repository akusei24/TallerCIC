const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const myConnection = require('express-myconnection');
const fileUpload=require('express-fileupload');
const app = express();
require('./passport/passport')(passport);
//importing routes

const alumnorutas = require('./routes/alumno');

// settings 

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
	host: 'localhost',
	user:'root',
	password:'',
	port: 3306,
	database: 'db_taller'
},'single'));
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use(flash());
app.use(session({
	secret: 'hide',
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
//rutas

app.use('/', alumnorutas);

//static files
app.use(express.static(path.join(__dirname, 'public')));


// starting server
app.listen(app.get('port'), () => {
	console.log('Servidor activo');
});