$(document).ready(()=>{
    const msg = document.getElementById('msg');

    let login = $('#login');
    login.submit((e)=>{
        e.preventDefault();
        $.ajax({
           url: 'login',
           method: 'POST',
           data: login.serializeArray(),
            success: (data)=>{
                if(data.validado){
                    if(data.estatus === 1){
                        location.href = '/chat';                    
                    }  
                    else {
                        debugger;
                        if(msg.classList.contains('hide')){
                            msg.classList.remove('hide');
                        }
                        msg.innerText = 'Al parecer, aun no has confirmado tu registro, revisa tu correo electronico para complementar tu registro';                        
                    }              
                }
                else{
                    if(msg.classList.contains('hide')){
                        msg.classList.remove('hide');
                    }
                    msg.innerText = 'el usuario y/o contraseña no coinciden';  
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

