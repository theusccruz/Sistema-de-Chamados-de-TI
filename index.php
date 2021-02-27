<?php
if (session_status() == PHP_SESSION_NONE) {
	include('./config/conexao.php');
	session_unset();
	session_destroy();
	setcookie('PHPSESSID', '', time() - 3600, '/');	
} else {
	echo ('nao ativa');
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<title>Chamados Suporte TI</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="./assets/style/ini_style.css">

</head>

<body>

	<div class="titlebody">
		<h1 class="apresent">SISTEMA DE CHAMADOS</h1>
	</div>

	<div class="logonlbl">

		<form class="loginform" action="./controller/login.php" method="POST" accept-charset="utf-8">

			<h2>Login</h2>

			<input class="cmpuser" type="text" name="usuario" placeholder="Usuário" required autofocus>
			<input class="cmpsenha" type="password" name="senha" placeholder="Senha" required>

			<input class="cmpentrar" type="submit" name="entrar" value="Entrar">

		</form>
	</div>

</body>

</html>