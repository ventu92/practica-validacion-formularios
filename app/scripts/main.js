'use strict'

$.validator.addMethod("mobileES", function(phone_number, element) {
    phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
    return this.optional(element) || phone_number.length == 9 &&
        phone_number.match(/^(6|8|9)[0-9]{8}$/);
}, "Please specify");

//*******************************************************************************************************

$.validator.addMethod("postalCodeES", function(numero, element) {
    return this.optional(element) || ($numero >= "1" && $numero <= "52999" && strlen($numero) == "5").test(value);
}, "Please specify a valid postal code");

//*******************************************************************************************************
$.validator.addMethod("nifES", function(value) {
    "use strict";

    value = value.toUpperCase();

    // Basic format test
    if (!value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) {
        return false;
    }

    // Test NIF
    if (/^[0-9]{8}[A-Z]{1}$/.test(value)) {
        return ("TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.substring(8, 0) % 23) === value.charAt(8));
    }
    // Test specials NIF (starts with K, L or M)
    if (/^[KLM]{1}/.test(value)) {
        return (value[8] === String.fromCharCode(64));
    }

    return false;

}, "Please specify a valid NIF number.");

$.validator.addMethod("nowhitespace", function(value, element) {
    return this.optional(element) || /^\S+$/i.test(value);
}, "No white space please");

//*******************************************************************************************************
$.validator.addMethod("iban", function(value, element) {
    // some quick simple tests to prevent needless work
    if (this.optional(element)) {
        return true;
    }

    // remove spaces and to upper case
    var iban = value.replace(/ /g, "").toUpperCase(),
        ibancheckdigits = "",
        leadingZeroes = true,
        cRest = "",
        cOperator = "",
        countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

    if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
        return false;
    }

    // check the country code and find the country specific format
    countrycode = iban.substring(0, 2);
    bbancountrypatterns = {
        "AL": "\\d{8}[\\dA-Z]{16}",
        "AD": "\\d{8}[\\dA-Z]{12}",
        "AT": "\\d{16}",
        "AZ": "[\\dA-Z]{4}\\d{20}",
        "BE": "\\d{12}",
        "BH": "[A-Z]{4}[\\dA-Z]{14}",
        "BA": "\\d{16}",
        "BR": "\\d{23}[A-Z][\\dA-Z]",
        "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
        "CR": "\\d{17}",
        "HR": "\\d{17}",
        "CY": "\\d{8}[\\dA-Z]{16}",
        "CZ": "\\d{20}",
        "DK": "\\d{14}",
        "DO": "[A-Z]{4}\\d{20}",
        "EE": "\\d{16}",
        "FO": "\\d{14}",
        "FI": "\\d{14}",
        "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "GE": "[\\dA-Z]{2}\\d{16}",
        "DE": "\\d{18}",
        "GI": "[A-Z]{4}[\\dA-Z]{15}",
        "GR": "\\d{7}[\\dA-Z]{16}",
        "GL": "\\d{14}",
        "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
        "HU": "\\d{24}",
        "IS": "\\d{22}",
        "IE": "[\\dA-Z]{4}\\d{14}",
        "IL": "\\d{19}",
        "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "KZ": "\\d{3}[\\dA-Z]{13}",
        "KW": "[A-Z]{4}[\\dA-Z]{22}",
        "LV": "[A-Z]{4}[\\dA-Z]{13}",
        "LB": "\\d{4}[\\dA-Z]{20}",
        "LI": "\\d{5}[\\dA-Z]{12}",
        "LT": "\\d{16}",
        "LU": "\\d{3}[\\dA-Z]{13}",
        "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
        "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
        "MR": "\\d{23}",
        "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
        "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "MD": "[\\dA-Z]{2}\\d{18}",
        "ME": "\\d{18}",
        "NL": "[A-Z]{4}\\d{10}",
        "NO": "\\d{11}",
        "PK": "[\\dA-Z]{4}\\d{16}",
        "PS": "[\\dA-Z]{4}\\d{21}",
        "PL": "\\d{24}",
        "PT": "\\d{21}",
        "RO": "[A-Z]{4}[\\dA-Z]{16}",
        "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "SA": "\\d{2}[\\dA-Z]{18}",
        "RS": "\\d{18}",
        "SK": "\\d{20}",
        "SI": "\\d{15}",
        "ES": "\\d{20}",
        "SE": "\\d{20}",
        "CH": "\\d{5}[\\dA-Z]{12}",
        "TN": "\\d{20}",
        "TR": "\\d{5}[\\dA-Z]{17}",
        "AE": "\\d{3}\\d{16}",
        "GB": "[A-Z]{4}\\d{14}",
        "VG": "[\\dA-Z]{4}\\d{16}"
    };

    bbanpattern = bbancountrypatterns[countrycode];
    // As new countries will start using IBAN in the
    // future, we only check if the countrycode is known.
    // This prevents false negatives, while almost all
    // false positives introduced by this, will be caught
    // by the checksum validation below anyway.
    // Strict checking should return FALSE for unknown
    // countries.
    if (typeof bbanpattern !== "undefined") {
        ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
        if (!(ibanregexp.test(iban))) {
            return false; // invalid country specific format
        }
    }

    // now check the checksum, first convert to digits
    ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
    for (i = 0; i < ibancheck.length; i++) {
        charAt = ibancheck.charAt(i);
        if (charAt !== "0") {
            leadingZeroes = false;
        }
        if (!leadingZeroes) {
            ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
        }
    }

    // calculate the result of: ibancheckdigits % 97
    for (p = 0; p < ibancheckdigits.length; p++) {
        cChar = ibancheckdigits.charAt(p);
        cOperator = "" + cRest + "" + cChar;
        cRest = cOperator % 97;
    }
    return cRest === 1;
}, "Please specify a valid IBAN");

//*******************************************************************************************************
$("#formulario").validate({
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
            minlength: 6
                //remote : "php/validar_email_db.php"
        },
        emailConf: {
            required: true,
            equalTo: email
        }
    },
    messages: {
        nombre: {
            lettersonly: "Solo letras",
            required: "introduce tu nombre, obligatorio"
        },
        apellidos: {
            required: "introduce tus apellidos, obligatorio"
        },
        telefono: {
            required: "introduce tu telefono, obligatorio",
            digits: "solo numeros por favor",
            mobileES: "numero invalido"
        },
        email: {
            required: "email es obligatorio",
            email: "este formato no es valido",
            minlength: "demasiado corto"

        },
        emailConf: {
            required: "email confirmacion es obligatorio",
            equalTo: "No coinciden los email"
        }
    }
});
$("#formulario2").validate({
    rules: {
        demandante: {
            required: true
        },
        NIF: {
            required: true,
            nifES: true
        },
        empresa: {
            required: true
        },
        direccion: {
            required: true
        },
        cp: {
            required: true,
            postalCodeES: true
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
            required: "campo obligatorio"
        },
        NIF: {
            required: "campo obligatorio",
            nifES: "dni no valido"
        },
        empresa: {
            required: "campo obligatorio"
        },
        direccion: {
            required: "campo obligatorio"
        },
        cp: {
            required: "campo obligatorio",
            postalCodeES: "codigo postal no es correcto"
        },
        localidad: {
            required: "campo obligatorio"
        },
        provincia: {
            required: "campo obligatorio"
        },
        pais: {
            required: "campo obligatorio"
        },
        IBAN: {
            required: "campo obligatorio",
            iban: "incorrecto"
        }
    }
});

$("#formulario3").validate({
    rules: {
        usuario: {
            required: true,
            minlength: 4
        },
        contraseña: {
            required: true,
        },
        contraseña2: {
            required: true,
            equalTo: contraseña
        }
    },
    messages: {
        usuario: {
            required: "campo obligatorio",
            minlength: "minimo 4 letras"
        },
        contraseña: {
            required: "campo obligatorio"
        },
        contraseña2: {
            required: "campo obligatorio",
            equalTo: "las contraseñas no coinciden"
        }
    }
});


$("#demandante").focusout(function() {
    if($("#demandante").val()==2){
        $("#nif").html("CIF:");
        $("#demandante").html("Empresa");
        $("#nif").attr({
            "id":"cif",
            "name": "cif"
        });
    }else{
        $("#nif").html("NIF:");
        $("#demandante").html("Nombre:");
        $("#cif").attr({
            "id":"nif",
            "name": "nif"
        });
    }
});