/*'use strict'
$('#email').focusout(function() {

	var email = $('#email').val();

	$.ajax({
         url: 'php/email.php',
         type: 'POST',
         data: 'email=' + $('#email').val(),
         success: function(opciones) {
             $('#emailConf').html(opciones);
         }
     });
});
*/