const websocket = io(); // iniciamos la conexion al servidor.

let nick = document.getElementById('nickname');
let contactos = document.getElementById('contactos');
let cerrar = document.getElementById('cerrar');
// guardamos lo usuarios que nos van llegandoc
let usuarios = [];

$(document).ready(()=>{
    // una vez cargada la pagina vamoos a enviar un socket diciendo que alguien se ha conectado
    websocket.emit('conectado',{nickname: nick.innerText});
    // recibimos un nuevo conectado
    websocket.on('nuevoContacto',(data)=>{
        // registramos los usuarios que nos llegan
        for(let i in data){
            if(!usuarios.includes(data[i])){
                // si no existe lo agregamos y lo dibujamos
                usuarios.push(data[i]);
                // vamos a dibujar el contacto
                let contacto = document.createElement('div');
                contacto.className = 'contacto animated fadeIn';
                contacto.id = data[i];
                let titulo = document.createElement('div');
                titulo.innerText = data[i];
                titulo.className = 'titulo';
                contacto.appendChild(titulo);
                let escribiendo = document.createElement('label');
                escribiendo.className = 'escribiendo hide animated fadeIn';
                contacto.appendChild(escribiendo);
                contactos.appendChild(contacto);
            }
        }
        console.log(usuarios);

    });
    // cerramos session
    cerrar.addEventListener('click',(e)=>{
        e.preventDefault();
        // al momento de cerrar session, notificamos a todos
        websocket.emit('cerrar',{nickname: nick.innerText});
        // redireccionamos para que cierre sesion
        location.href = '/cerrar';
    });
    // borramos al contaco que halla cerrado sesion;
    websocket.on('someoneOut',(data)=>{
        // borramos a quien halla cerrado sesion de la lista
        usuarios.splice(usuarios.indexOf(data.nickname),1);
        console.log(usuarios);
        // eliminamos el contacto en el HTML
        document.getElementById(data.nickname).remove();
    });
});