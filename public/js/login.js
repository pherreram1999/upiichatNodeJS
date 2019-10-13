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
                    location.href = '/chat';
                }
                else{
                    if(msg.classList.contains('hide')){
                        msg.classList.remove('hide');
                    }
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

