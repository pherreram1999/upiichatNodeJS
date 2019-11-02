const form = document.getElementById('formNewPass');
const pass1 = document.getElementById('txtPassword');
const pass2 = document.getElementById('txtRepeatPassword');
const notificacion = document.getElementById('notificacion');
const nick = document.getElementById('nickname');

pass2.addEventListener('input',()=>{
    if(pass1.value === pass2.value){
        notificacion.innerText = 'las contraseñas coinciden';
        notificacion.className = 'green-text';
    }
    else {
        notificacion.innerText = 'las contraseñas NO coinciden';
        notificacion.className = 'red-text'
    }
});

pass1.addEventListener('input',()=>{
    if(pass1.value === pass2.value){
        notificacion.innerText = 'las contraseñas coinciden';
        notificacion.className = 'green-text';
    }
    else {
        notificacion.innerText = 'las contraseñas NO coinciden';
        notificacion.className = 'red-text'
    }
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(pass1.value === pass2.value){
        $.ajax({
            url: '/newpass',
            method: 'POST',
            data: {password: pass1.value, nickname: nick.innerText},
            success: ()=>{
                alert('tu contraseña ha sido cambiada con exito');
                location.href = '/login';
            }
        });
    }
    else {
        alert('las contraseñas no coinciden');
    }
});