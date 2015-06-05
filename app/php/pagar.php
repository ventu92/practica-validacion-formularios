<!DOCTYPE html>
<html>
<head>
	<title>Primer pago</title>
</head>
<body>

	<?php
	$cantidad=$_POST['pago'];
	echo '<h1>se va a proceder al cobro de la primera factura con un total de '.$cantidad.'euros</h1>';
	echo "<form action=\"../index.html\"><input type=\"submit\" value=\"Aceptar\"></form>";
	?>
</body>
</html>