'use strict'
$.validator.addMethod('mobileES', function(phone_number, element) {
    phone_number = phone_number.replace(/\(|\)|\s+|-/g, '');
    return this.optional(element) || phone_number.length == 9 &&
        phone_number.match(/^(6|8|9)[0-9]{8}$/);
}, 'Please specify');