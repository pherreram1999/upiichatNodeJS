const websocket = io(); // iniciamos la conexion al servidor.

let nick = document.getElementById('nickname');

$(document).ready(()=>{
    websocket.emit('conectado',{nickname: nick.innerText});
});