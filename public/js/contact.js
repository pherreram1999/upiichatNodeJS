const form = document.getElementById('formContact');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(mensaje.classList.contains('hide')){
        mensaje.classList.remove('hide');
    }
    $.ajax({
        url: '/contacto',
        method: 'POST',
        data: $('#formContact').serializeArray(),
        success:()=>{
            alert('UPIICHAT agredece que nos hallas contacto, trataremos de darte un respuesta los mas pronto posible');
            location.href = '/';
        }
    });
});