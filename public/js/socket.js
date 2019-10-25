const websocket = io(); // iniciamos la conexion al servidor.

let nick = document.getElementById('nickname');
let contactos = document.getElementById('contactos');
let cerrar = document.getElementById('cerrar');
let formMensaje = document.getElementById('formMensaje');
let mensaje = document.getElementById('txtMensaje');
let id_usuario = document.getElementById('id_usuario');
let chat = document.getElementById('chat');
let viewContacts = document.getElementById('viewContacts');
let iconContacts = document.getElementById('iconContacts');
let viewChat = document.getElementById('viewChat');
let viewConectados = document.getElementById('viewConectados');

// creamos un funcion para que dibuje los mensajes

function dibujar(mensajes){
    for(let i in mensajes){
        // vamos a dibujar los mensajes
        let mensaje = document.createElement('div');
        mensaje.className = 'mensaje';
        let nick = document.createElement('div');
        nick.className = 'nickname';
        nick.innerText = mensajes[i].nickname;
        mensaje.appendChild(nick);
        let contenido = document.createElement('div');
        contenido.className = 'contenido';
        contenido.innerText = mensajes[i].mensaje;
        mensaje.appendChild(contenido);
        // agregamos al chat el mensaje
        chat.appendChild(mensaje);
    }
    // una vez dibujado lo mandamos hacia el ultimo mensaje
    // faltaria agregar una condicion entra para poder hacer que solo baje el scroll cuando este en el ultimo mensaje
    $(chat).animate({ scrollTop: $(chat)[0].scrollHeight}, 0)
}

// vamos a crear un mecanismo para en los telefonos moviles turnar el chat y los contactos en la vista

viewContacts.addEventListener('click',(e)=>{
    e.preventDefault();

    if(iconContacts.innerText === 'contacts'){
        iconContacts.innerText = 'message';
        if(viewConectados.classList.contains('hide-on-med-and-down')){
            viewConectados.classList.remove('hide-on-med-and-down');
            if(!viewChat.classList.contains('hide-on-med-and-down')){
                viewChat.classList.add('hide-on-med-and-down');
            }
        }
    }
    else {
        iconContacts.innerText = 'contacts';
        if(viewChat.classList.contains('hide-on-med-and-down')){
            viewChat.classList.remove('hide-on-med-and-down');
            if(!viewConectados.classList.contains('hide-on-med-and-down')){
                viewConectados.classList.add('hide-on-med-and-down');
            }
        }
    }

});

// guardamos lo usuarios que nos van llegandoc
let usuarios = [];

$(document).ready(()=>{
    // cargar los mensajes una vez halla cargado la pagina
    $.ajax({
        url: '/getMessages',
        method: 'POST',
        success: (data)=>{
            dibujar(data);
        }
    });


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
                escribiendo.innerText = 'escribiendo ...';
                contacto.appendChild(escribiendo);
                contactos.appendChild(contacto);
            }
        }
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
        // eliminamos el contacto en el HTML
        document.getElementById(data.nickname).removeElemet();
    });
    // vamos a indicar quien va estar escribiendo
    mensaje.addEventListener('input',()=>{
        websocket.emit('typing',{nickname: nick.innerText});
    });
    // vamos a pones la etiqueta de esta escribiendo
    websocket.on('someoneWriting',(data)=>{
       let contacto = document.getElementById(data.nickname);
       let label = contacto.lastChild;
       if(label.classList.contains('hide')){
           label.classList.remove('hide');
       }
    });

    formMensaje.addEventListener('submit',(e)=>{
        e.preventDefault();
        // para indicar a quien se va quitar la marca de esta escribiendo
        websocket.emit('wrote',{nickname: nick.innerText});
        // preparamos el mensaje a enviar
        let objMensaje = {
            mensaje: mensaje.value,
            id_usuario: id_usuario.innerText,
            nickname: nick.innerText
        };
        // envimaos al servido el mensaje
        // lo ponemos dentro de un arreglo para reutilizar la funcion de dibujo
        websocket.emit('sendMessage',[objMensaje]);
        mensaje.value = '';
    });

    websocket.on('deleteLabel',(data)=>{
        let contacto = document.getElementById(data.nickname);
        let label = contacto.lastChild;
        if(!label.classList.contains('hide')){
            label.classList.add('hide');
        }
    });

    // recibimos el mensaje
    websocket.on('getMessage',(data)=>{
        dibujar(data);
    });

});