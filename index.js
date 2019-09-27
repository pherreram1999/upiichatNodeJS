const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
require('colors');
//init 
const app = express();
//settings
app.set('views',path.join(__dirname,'views'));//carpeta de las vistas
app.set('port',process.env.PORT || 80);
app.engine('.hbs',hbs({ //configuracion de handlebars
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: path.join(__dirname,'libs')
}));
app.set('view engine','.hbs'); // se establece el motor de plantillas
//midleweares
app.use(bodyParser.urlencoded({ // para procesar los JSON
    extended: true
}));
app.use(express.json());
app.use(morgan('dev'));

//global variables
app.use((request,response,next)=>{
    next();
});
//routes 
app.use(require('./routes/main'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));
//public
app.use(express.static(path.join(__dirname,'public')));
//Start server
const server = app.listen(app.get('port'),()=>{
    console.log("Server ready on port 80".green);
});
const io = socketio(server); // creamos el socket
// cada que se realiza una nueva conexion se ejecuta esta funcion
io.on('connection',(socket)=>{
    let message = 'New connection ' + socket.id;
    //console.log(message.yellow);
});