<?php 

	require '../model/userClass.php';

	// if(empty($_POST['usuario']) || empty($_POST['senha'])) {
	// 	header('Location: ../index.php');
	// 	exit();
	// }

	$u = new Usuario();

	$usuario = ($_POST['usuario']);
	$senha = ($_POST['senha']);

	$result = $u->login($usuario, $senha);

	

	if($result) {
		if(isset($_SESSION['IDUSUARIO'])) {
			if ($_SESSION['SETOR_ID'] === 3) {
				header('Location: ../view/page_tecnico.php');
			} else {
				header('Location: ../view/page_usuario.php');
			}
		} else {
			header('Location: ../index.php');
		}	
	} else {	
		header('Location: ../view/errLogin.php');
	} 


 ?>