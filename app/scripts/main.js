'use strict'
$('#demandante').focusout(function() {
    if ($('#demandante').val() == 2) {
        $('#nif').html('CIF*:');
        $('#empresa').html('Empresa*:');
        $('#lblnif').attr({
            'id': 'lblcif',
            'name': 'lblcif',
            'placeholder': 'introduce tu CIF'
        });
        $("#lblcif").val("");
        $("#nombreDemandante").val("");
    }else {
        $('#nif').html('NIF*:');
        $('#empresa').html('Nombre*:');
        $('#lblcif').attr({
            'id': 'lblnif',
            'name': 'lblnif',
            'placeholder': "introduce tu NIF"
        });
        var nombre = $("#nombre").val();
        var apellidos = $("#apellidos").val();
        $("#lblnif").val("");
        $("#nombreDemandante").val(nombre + " " + apellidos);
    }
});

$('#formularioentero').validate({
    rules: {
        nombre: {
            lettersonly: true,
            required: true
        },
        apellidos: {
            required: true
        },
        telefono: {
            required: true,
            digits: true,
            mobileES: true
        },
        email: {
            required: true,
            email: true,
            minlength: 4,
            remote : "php/email.php"
        },
        emailConf: {
            required: true,
            equalTo: email
        },
        demandante: {
            required: true
        },
        lblnif: {
            required: true,
            nifES:true,
            remote : 'php/nif.php'
        },
        lblcif:{
            required: true,
            cifES: true
        },
        empresa: {
            required: true
        },
        direccion: {
            required: true
        },
        cp: {
            required: true,
            digits: true
        },
        localidad: {
            required: true
        },
        provincia: {
            required: true
        },
        pais: {
            required: true
        },
        IBAN: {
            required: true,
            iban: true
        },
        usuario: {
            required: true,
            minlength: 4
        },
        contraseña: {
            required: true,
            complexify: true
        },
        contraseña2: {
            required: true,
            equalTo: contraseña
        }
    },
    messages: {
        nombre: {
            lettersonly: 'Solo letras',
            required: 'introduce tu nombre, obligatorio'
        },
        apellidos: {
            required: 'introduce tus apellidos, obligatorio'
        },
        telefono: {
            required: 'introduce tu telefono, obligatorio',
            digits: 'solo numeros por favor',
            mobileES: 'numero invalido'
        },
        email: {
            required: 'email es obligatorio',
            email: 'este formato no es valido',
            minlength: 'demasiado corto',
            remote: 'email ya existe'
        },
        emailConf: {
            required: 'email confirmacion es obligatorio',
            equalTo: 'No coinciden los email'
        },
        demandante: {
            required: 'campo obligatorio'
        },
        lblnif: {
            required: 'campo obligatorio',
            nifES:'nif erroneo',
            remote:' el nif ya existe'
        },
        lblcif:{
            required: 'campo obligatorio',
            cifES:'CIF erroneo'
        },
        empresa: {
            required: 'campo obligatorio'
        },
        direccion: {
            required: 'campo obligatorio'
        },
        cp: {
            required: 'campo obligatorio',
            digits: 'codigo postal no es correcto'
        },
        localidad: {
            required: 'campo obligatorio'
        },
        provincia: {
            required: 'campo obligatorio'
        },
        pais: {
            required: 'campo obligatorio'
        },
        IBAN: {
            required: 'campo obligatorio',
            iban: 'numero IBAN incorrecto'
        },usuario: {
            required: 'campo obligatorio',
            minlength: 'minimo 4 letras'
        },
        contraseña: {
            required: 'campo obligatorio'
        },
        contraseña2: {
            required: 'campo obligatorio',
            equalTo: 'las contraseñas no coinciden'
        }
    }
});

$("#apellidos").focusout(function() {
    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    $("#nombreDemandante").val(nombre + " " + apellidos);
});

