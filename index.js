const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const sesion = require('express-session');
const cors = require('cors');
require('colors');
// para guardar los usuarios que se encuntran ya conectados, y no se vuelvan a repetir
let usuarios = [];
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
app.use(sesion({
    secret: 'chonita',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
    // para las paginas que no tenemos

//global variables
app.use((request,response,next)=>{
    next();
});
//routes 
app.use(require('./routes/main'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.all(require('./routes/chat'));
//public
app.use(express.static(path.join(__dirname,'public')));
//Start server
const server = app.listen(app.get('port'),()=>{
    console.log("Server ready on port 80".green);
});
const io = socketio(server); // creamos el socket
// cada que se realiza una nueva conexion se ejecuta esta funcion
io.on('connection',(socket)=>{
    socket.on('conectado',(data)=>{
        // comprobamos  si el usuario ya existe
        if(!usuarios.includes(data.nickname)){
            // en el caso de que no existe se agregar a la lista
            usuarios.push(data.nickname);
        }
        // una vez agregados los usuarios, los vamos a enviar
        io.sockets.emit('nuevoContacto',usuarios);
    });
    // para cuando el usuario cierre session lo eliminamos de la lista;
    socket.on('cerrar',(data)=>{
        //eliminamos al usuarios de la lista
        usuarios.splice(usuarios.indexOf(data.nickname),1);
        // procedemos a enviarlo a el resto, el usuario que ha cerrado sesion
        io.sockets.emit('someoneOut',data);

    });
    // indicamos a los demas quien esta tecleando
    socket.on('typing',(data)=>{
        socket.broadcast.emit('someoneWriting',data);
    });
    // enviamos a los demas que marca se tiene que eliminar
    socket.on('wrote',(data)=>{
        socket.broadcast.emit('deleteLabel',data);
    });
    // recibimos el mensaje e indicamos a quien vamos a quitar el indicador de que esta escribiendo
    socket.on('sendMensaje',(data)=>{

    });
});