const form = document.getElementById('recoveryForm');
const mensaje = document.getElementById('mensaje');
const email = document.getElementById('txtEmail');
const carta = document.getElementById('carta');
const contenido1 = document.getElementById('contenido1');
const contenido2 = document.getElementById('contenido2');
const btn = document.getElementById('btnEnviar');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    $.ajax({
       url:'/recovery',
       method: 'POST',
       data: $('#recoveryForm').serializeArray(),
       success: (data)=>{
           if(data.emailExist){
               if(!mensaje.classList.contains('hide')){
                   mensaje.classList.add('hide');
               }
               contenido1.classList.add('hide');
               contenido2.classList.remove('hide');
               btn.classList.add('hide');
           }
           else {
               if(mensaje.classList.contains('hide')){
                   mensaje.classList.remove('hide');
               }
           }
       }
    });
});

email.addEventListener('click',()=>{
   if(!mensaje.classList.contains('hide')){
       mensaje.classList.add('hide');
   }
});