// Importaciones
require('dotenv').config();
const express =require('express');
const path =require('path');
const cookieParser=require('cookie-parser');
const csrf = require('csurf');
const bodyParser= require('body-parser');
const morgan = require('morgan');
const csrfMiddleware = csrf({ cookie: true });
const WebSocket= require('socket.io');
const admin = require('firebase-admin')
const app=express();

// Configuraciones
const port = process.env.PORT ||3000;
app.set('port',3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


console.log("admin firebase iniciado.");
// Middleware

// App Uses extras
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(morgan('dev'));

// Routes
app.use(require('./app/Routes/Routes'));

// Static file
app.use(express.static(path.join(__dirname,'public')))



app.use((req,res,next)=>{
    res.status(404).render('404')
});

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

app.listen(app.get('port'),()=>{
    console.log("Servidor levantado " +app.get('port'))
    console.log("http://localhost:" +app.get('port'))
});