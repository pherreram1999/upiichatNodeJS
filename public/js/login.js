$(document).ready(()=>{
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
                    $('#msg').attr('style','display:block');
                }
            }
        });
    });
});

let nickname = document.getElementById('nickname');
let password = document.getElementById('txtPassword');
nickname.addEventListener('focus',(e)=>{
    $('#msg').attr('style','display:none');
});

