'use strict'

$('#formulario').validate({
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
            minlength: 6,
            remote : "php/email.php"
        },
        emailConf: {
            required: true,
            equalTo: email
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
            remote:"error conexion "
        },
        emailConf: {
            required: 'email confirmacion es obligatorio',
            equalTo: 'No coinciden los email'
        }
    }
});

$('#formulario2').validate({
    rules: {
        demandante: {
            required: true
        },
        NIF: {
            required: true,
            nifES:true
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
        }

    },
    messages: {
        demandante: {
            required: 'campo obligatorio'
        },
        NIF: {
            required: 'campo obligatorio',
            nifES:'nif erroneo'
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
        }
    }
});

$('#formulario3').validate({
    rules: {
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
        usuario: {
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

$('#demandante').focusout(function() {
    if ($('#demandante').val() == 2) {
        $('#nif').html('CIF*:');
        $('#empresa').html('Empresa*:');
        $('#nif').attr({
            'id': 'cif',
            'name': 'cif',
            'placeholder': "introduce tu CIF"
        });
        $("#nombreDemandante").val("");
    } else {
        $('#cif').html('NIF*:');
        $('#empresa').html('Nombre*:');
        $('#cif').attr({
            'id': 'nif',
            'name': 'nif',
            'placeholder': "introduce tu NIF"
        });
        var nombre = $("#nombre").val();
        var apellidos = $("#apellidos").val();
        $("#nombreDemandante").val(nombre + " " + apellidos);
    }
});