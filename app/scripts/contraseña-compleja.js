'use strict'
 $('#contraseña').focusin(function() {
     $('#contraseña').complexify({}, function(valid, complexity) {
         $('#progressBar').val(complexity);
     });
 });

 jQuery.validator.addMethod('complexify', function(value, element) {

     var prueba = $('#progressBar').val();

     if (prueba < 5) {
         return false;
     } else {


         return true;
     }
 }, 'Contraseña insegura');