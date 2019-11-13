const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');



// objeto usuario
const chat = require('./models/chat');

require('colors');
// para guardar los usuarios que se encuntran ya conectados, y no se vuelvan a repetir
let usuarios = [];
//init 
const app = express();
//settings
app.set('views',path.join(__dirname,'views'));//carpeta de las vistas
app.set('port',process.env.PORT || 8080);
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
app.use(session({
    secret: 'chonita',
    resave: true,
    saveUninitialized: true
}));
app.use(multer({
    storage: multer.diskStorage({
        destination: 'public/images/users',
        filename: (req,file,callback)=>{
            // el primer parametro el para caputar el error
            callback(null,file.originalname)
        }
    }),
    limits: {
        fieldSize: 3000000
    },
    fileFilter: (req,file,callback)=>{
        const filetypes = /jpg|jpeg|gif|png/
        let mimetype = filetypes.test(file.mimetype);
        let extension = filetypes.test(path.extname(file.originalname));
        if(mimetype && extension){
            return callback(null,true);
        }
        callback('El archivo no ha se ha subido correctamentes');
    }
}).single('perfil'));

app.use(multer({
    storage: multer.diskStorage({
        destination: 'images/chat',
        filename: (req,file,callback)=>{
            callback(null,file.originalname);
        }
    })
}).single('fotoChat'));

//routes 
app.use(require('./routes/main'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.use(require('./routes/chat'));
app.use(require('./routes/recovery'));
app.use(require('./routes/contact'));
app.use(require('./routes/test'));
app.use(require('./routes/admin'));
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
        // una vez amgregados los usuarios, los vamos a enviar
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
    // recibimos el mensaje
    socket.on('sendMessage',async (data)=>{
        // enviamos el mensaje a todos
        io.sockets.emit('getMessage',data);
        // guardamos el mensaje
        await chat.saveMessage(data);

    });

});