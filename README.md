
**Validaciones y comportamiento del formulario:**
Debemos hacer las siguientes validaciones en cliente antes de hacer el envío del formulario:
- Comprobaremos que el usuario no exista previamente en la bbdd (NIF o email, el CIF no es necesario).	
- CP . Si son menos se completará con 0 a la izquierda.
- Por defecto estará marcado como demandante Particular y como Nombre (apartado Datos de facturación) la combinación de los campos Nombre y Apellidos de la información de contacto. Si el usuario selecciona como demandante Empresa, se borrará el contenido del campo “Nombre”, que pasará a llamarse “Empresa” para que el usuario lo rellene. 	
- Los campos CIF/NIF y Nombre/Empresa adecuarán su label en función del demandante seleccionado.
- Una vez insertado el código postal, se debe seleccionar la provincia y la localidad de forma automática. La localidad se rellenará con criterio libre.
- El usuario , se rellenará de modo automático 	con el correo electrónico y no podrá ser modificado.
- La contraseña se debe forzar a que sea compleja.
- Una vez pulsemos enviar en el formulario se mostrará un aviso al usuario de que se va a dar de alta y que se le pasará la primera cuota de 50€, 140€ o 550€ según corresponda (forma de pago). El usuario podrá cancelar la operación.

**Datos de test:** 
- El usuario con email juandacorreo@gmail.com y DNI 25456737S deberá estar dado de alta en la base de datos. 
- El CIF que probaré es el siguiente: A28017895 (El Corte Inglés).
- El código IBAN: ES91 2085 0166 69 0330150871

	
**Requerimientos adicionales:**
- Uso de al menos un plugin adicional, por ejemplo:
    - jquery Complexify para la complejidad de la contraseña.
    - http://harvesthq.github.io/chosen/ para los select


- El código html, css y js deberá ir en sus propios ficheros. Se debe disponer de **dos versiones del código, una de desarrollo y otra de producción** que tendrá todos los ficheros minified y concatenados, de modo que haya un único js para todo el código que no sea nuestro (jQuery, Validate…), un único css para todo el código que no sea nuestro (Bootstrap por ej.), y un único css o js para el código que hayamos hecho nosotros. Para realizar todo este proceso  y por temas de productividad y eficiencia **se recomienda encarecidamente el uso de Yeoman**. Para facilitar y "forzar" a ello, ya os proporciono la estructura de la aplicación con Yeoman (yo webapp). En infenlaces.com se colgará exclusivamente el código de producción de modo que pueda llegar al mismo navegando a partir de la [lista de usuarios](http://www.infenlaces.com).