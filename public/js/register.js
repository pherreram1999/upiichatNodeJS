//validar contraseña
$(document).ready(()=>{
    const pass1 = document.getElementById('txtPassword');
    const pass2 = document.getElementById('txtPasswordRepeat');
    const passMessage = document.getElementById('passMessage');
    function validarMismaContrasena () {
        if(pass1.value === pass2.value){
            passMessage.innerHTML = 'las contraseñas coinciden';
            passMessage.className = 'has-text-success';
        }
        else {
            passMessage.innerHTML = 'las contraseñas <strong class="has-text-danger">NO</strong> coinciden';
            passMessage.className = 'has-text-danger';
        }
    }
    pass2.addEventListener('change',()=>{
        passMessage.setAttribute('style','display:block');
        validarMismaContrasena();
    });
    pass1.addEventListener('change',()=>{
        validarMismaContrasena();
    });
});

// envuiamos lo datos
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

let email = document.getElementById('txtEmail');
email.addEventListener('focus',()=>{
    $('#msg').attr('style','display:none');
});