<?php
	session_start();
	header('Content-Type: application/json');

	require '../config/conexao.php';
	$conn = Database::getConnection();

	$sql = "SELECT * FROM USUARIO WHERE setor_id = 3";
	$stms = $conn->prepare($sql);	
	$stms->execute();

	$linha = $stms->fetchAll(PDO::FETCH_ASSOC);
		if ($linha >= 0) {
			echo json_encode($linha);	
		} else {	
			echo json_encode("Dadossa");
		}
?>