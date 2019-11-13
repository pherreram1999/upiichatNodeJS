const admin = document.getElementById('admin');

admin.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log($('#admin').serializeArray());
    $.ajax({
        url: '/loginAdmin',
        method: 'POST',
        data: $('#admin').serializeArray(),
        success: (data)=>{
            if(data){
                location.href = '/dashboard';
            }
            else {
                alert('Acceso negado')
            }
        },
        error: ()=>{
            alert('ha ocurriod un error');
        }
    });
});