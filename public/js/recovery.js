const form = document.getElementById('recoveryForm');
const mensaje = document.getElementById('mensaje');

$(document).ready(()=>{
    $.ajax({
       url: '/mail',
       method: 'POST',
        success: ()=>{
           alert('enviado');
        }
    });
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();

});