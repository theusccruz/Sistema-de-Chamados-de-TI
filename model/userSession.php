<?php


	session_start();
	
	header('Content-Type: application/json');

	require '../model/userClass.php';

	//conexão
	$conn = Database::getConnection();
	

	//variaveis de usuario da sessão
	$dado = Usuario::dadosUsuario();

	$idUser = $dado['ID'];
    $setorUser = $dado['SETOR_ID'];
    
    echo json_encode($_SESSION);

    	

?>


