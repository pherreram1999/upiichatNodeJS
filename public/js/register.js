//validar contraseña
$(document).ready(()=>{
    const pass1 = document.getElementById('txtPassword');
    const pass2 = document.getElementById('txtPasswordRepeat');
    const samePassword = document.getElementById('samePassword');
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
    //validar el registro de la contraseña
    pass2.addEventListener('keypress',()=>{
        samePassword.setAttribute('style','display:block');
        validarMismaContrasena();
    });
    pass1.addEventListener('keypress',()=>{
        validarMismaContrasena();
    });
});

// enviamos lo datos
$('#registro').submit((e)=>{
    e.preventDefault();
    $.ajax({
        url: 'registrar',
        method: 'POST',
        data: $('#registro').serializeArray(),
        success: (data)=>{
            if(data.nicknameExist){
                $('#msg').attr('style','display:block');                
            }
            else {
                // el usuario ha sido registrado
                alert('registrado correctamente');
                location.href = '/login';                
            }
        }
    });
});

let nick = document.getElementById('nickname');

nick.addEventListener('focus',()=>{
    $('#msg').attr('style','display:none');
});