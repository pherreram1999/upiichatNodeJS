
$(document).ready(()=>{
    const msg = document.getElementById('msg');

    let login = $('#login');
    login.submit((e)=>{
        e.preventDefault();
        if(msg.classList.contains('hide')){
            msg.innerText = 'Espera... estamos validando';
            msg.className = 'green white-text card-panel';
        }
        $.ajax({
           url: 'login',
           method: 'POST',
           data: login.serializeArray(),
            success: (data)=>{
                if(data.validado){
                    location.href = '/chat';
                }
                else{
                    if(msg.classList.contains('hide')){
                        msg.classList.remove('hide');
                    }
                    msg.innerHTML = 'El usuario y/o contraseña no coinciden';
                    msg.className = 'red white-text card-panel';

                }
            }
        });
    });
});

let nickname = document.getElementById('nickname');
let password = document.getElementById('txtPassword');
nickname.addEventListener('focus',(e)=>{
    if(!msg.classList.contains('hide')){
        msg.classList.add('hide');
    }
});
password.addEventListener('focus',()=>{
    if(!msg.classList.contains('hide')){
        msg.classList.add('hide');
    }
});

