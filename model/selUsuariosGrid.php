<?php
	session_start();
	header('Content-Type: application/json');
	require '../config/conexao.php';
	$conn = Database::getConnection();

	$sql = "SELECT
        USU.id as ID, USU.nome, SETR.SETOR as SETOR, USU.cargo, USU.SETOR_ID
    FROM usuario USU
        LEFT JOIN SETORES SETR on SETR.ID = USU.setor_id";

	$stms = $conn->prepare($sql);	
	$stms->execute();

	$linha = $stms->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($linha);	

?>