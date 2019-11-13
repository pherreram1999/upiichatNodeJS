//validar contraseña
$(document).ready(()=>{
    const email = document.getElementById('txtEmail');
    const pass1 = document.getElementById('txtPassword');
    const pass2 = document.getElementById('txtPasswordRepeat');
    const samePassword = document.getElementById('samePassword');
    const terminos = document.getElementById('terminos');
    const mensaje = document.getElementById('msg');
    const mail = document.getElementById('txtEmail');

    function validarMismaContrasena () {
        if(pass1.value === pass2.value){
            samePassword.innerHTML = 'las contraseñas coinciden';
            samePassword.className = 'green-text';        
        }
        else {
            samePassword.innerHTML = 'las contraseñas no coinciden';
            samePassword.className = 'red-text';
        }
    }

    // validar que sea correo del IPN
    function validarIPN(email){
        let partes = email.split('@');
        return (partes[1] === 'alumno.ipn.mx');
        
    }
    
    //validar el registro de la contraseña
    pass2.addEventListener('change',()=>{        
        if(mensaje.classList.contains('red')){
            if(!mensaje.classList.contains('hide')){
                mensaje.classList.add('hide');
            }
        }
        validarMismaContrasena();
        samePassword.classList.remove('hide');
    });
    pass1.addEventListener('change',()=>{
        if(mensaje.classList.contains('red')){
            if(!mensaje.classList.contains('hide')){
                mensaje.classList.add('hide');
            }
        }
        validarMismaContrasena();
    });

    // enviamos lo datos
    $('#registro').submit((e)=>{
        e.preventDefault();
        if(validarIPN(mail.value.trim())){
            if(pass1.value === pass2.value){
                if(terminos.checked){
                    // inicamos la carga
                    mensaje.className = 'card-panel';
                    mensaje.innerHTML = 'espera... te estamos registrando ';
                    $.ajax({
                        url: '/registrar',
                        method: 'POST',
                        data: $('#registro').serializeArray(),
                        success: (data)=>{
                            if(data.emailExist){
                                mensaje.innerHTML = 'Ops..! lo sentimos, correo ya se encuentra registrado';
                                mensaje.className = 'card-panel animated shake';
                            } else if(data.nicknameExist){
                                mensaje.innerHTML = 'Ops..! el apodo ya se encuentra en uso, si es tu usuario, da <a href="/login">click aqui</a> para iniciar sesión';
                                mensaje.className = 'card-panel animated shake';
                            }
                            else {
                                alert('registrado correctamente');
                                location.href = '/login';
                            }
                        }
                    });
                }
                else {
                    mensaje.classList.add('yellow');
                    mensaje.innerHTML = 'Debes de aceptar los terminos y condiciones';
                    mensaje.classList.remove('hide');
                }
            }
            else {        
                mensaje.classList.add('red');
                mensaje.innerHTML = "La contraseñas no coinciden";
                mensaje.classList.remove('hide');
            }           
        }
        else {
            if(mensaje.classList.contains('hide')){
                mensaje.classList.remove('hide');
                mensaje.innerHTML = 'Lo sentimos... pero el registro es exclusivo para correos institucionales';
            }
        }
        
    });

    terminos.addEventListener('change',()=>{
        if(terminos.checked){
            if(!mensaje.classList.contains('hide')){
                mensaje.classList.add('hide');
            }
        }
    });

    email.addEventListener('click',()=>{
        if(!mensaje.classList.contains('hide')){
            mensaje.classList.add('hide');
        }
    });

    let nick = document.getElementById('nickname');

    nick.addEventListener('focus',()=>{
        mensaje.classList.add('hide');
    });

    nick.addEventListener('input',()=>{
        nick.value = nick.value.replace(' ','');
    })
});

