const borrar = document.getElementById('borrar');
const vaciar = document.getElementById('vaciar');
const palabras = document.querySelector('#palabras')
const word = document.querySelector('#word');
const txtPalabra = document.querySelector('#txtPalabra'); 
const delPalabras = document.querySelector('#delPalbras');


txtPalabra.addEventListener('input', e => {
    txtPalabra.value = txtPalabra.value.replace(' ','');
});


Element.prototype.removeElement = function() {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

$(document).ready(e=>{
    $.ajax({
        url:'/palabras',
        method: 'POST',
        success: data =>{
            for(let i in data){
                let option = document.createElement('option');
                option.value = data[i].palabra;
                option.innerText = data[i].palabra;
                palabras.append(option);
            }
        },
        error: e =>{
            console.error('Ha succedio un error');
        }
    });
});


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
});

word.addEventListener('submit',e =>{
    e.preventDefault();
    M.toast({html: 'Agregando...'})
    $.ajax({
        url: '/palabra',
        method: 'PUT',
        data: $('#word').serializeArray(),
        success: data =>{
            let option = document.createElement('option');
            option.value = txtPalabra.value;
            option.innerText = txtPalabra.value;
            palabras.appendChild(option);
            txtPalabra.value = '';
            M.toast({html: 'Agregado'});

        },
        error: ()=>{
            console.error('Consulta AJAX no funciono');
        }
    });
});

delPalabras.addEventListener('click', e =>{

    if(palabras.value !== ''){
        if(palabras.selectedOptions.length === 1){
            M.toast({html: 'Borrando..'});
            $.ajax({
            url: '/palabra',
            method: 'DELETE',
            data: {palabra: palabras.value},
            success:()=>{
    
                M.toast({html: 'Borrado'});
                palabras.selectedOptions[0].removeElement();
            }
        });
        }
        else {
            M.toast({html: 'Solo seleccione uno'})
        }
    }
    else {
        M.toast({html: 'No haz seleccionado ninguno'});
    }
});