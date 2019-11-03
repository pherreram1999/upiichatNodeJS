const form = document.getElementById('formContact');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
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