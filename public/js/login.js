$(document).ready(()=>{
    let login = $('#login');
    login.submit((e)=>{
        e.preventDefault();
        $.ajax({
           url: 'login',
           method: 'POST',
           data: login.serializeArray(),
            success: (data)=>{

            }
        });
    });
});
