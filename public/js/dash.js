const borrar = document.getElementById('borrar');
const vaciar = document.getElementById('vaciar');


borrar.addEventListener('click',(e)=>{
    if(confirm('¿Seguro que desea borrar los usuarios?')){
        $.ajax({
            url: '/usuarios',
            method: 'DELETE',
            success: ()=>{
                alert('usuarios borrados');
            },
            error: ()=>{
                alert('Ha ocurrido un error');
            }
        });
    }
});

vaciar.addEventListener('click',(e)=>{
    e.preventDefault();
    if(confirm('¿Seguro que desea vaciar el chat?')){
        $.ajax({
            url: '/chat',
            method: 'DELETE',
            success: ()=>{
                alert('El chat ha sido vaciado');
            },
            error: ()=>{
                alert('ha ocurrido un error');
            }
        });
    }
})