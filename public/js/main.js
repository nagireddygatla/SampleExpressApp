$(document).ready(function(){
    $('.deleteUser').on('click',deleteUser);
    $('.updateUser').on('click',updateUser);

});

function deleteUser(){
    var confirmation = confirm('Are you sure?');
    if(confirmation){
    $.ajax({
        type: 'DELETE',
        url: '/users/delete' + $(this).data('id')
    }).done(function(response){
        window.location.replace('/');
    });
    window.location.replace('/');
}
else{
    return false;
}
}


function updateUser(){

    //alert('hi');
   
    $.ajax({
        type: 'GET',
        url: '/users/get' + $(this).data('id'),
        success: function(data){
         
            document.getElementsByName('first_name')[0].value = data[0].first_name;
            document.getElementsByName('last_name')[0].value = data[0].last_name;
            document.getElementsByName('email')[0].value = data[0].email;

        }
    });
    //window.location.replace('/');

}

