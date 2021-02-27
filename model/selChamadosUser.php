<?php
	session_start();
	header('Content-Type: application/json');
	require '../model/userClass.php';

	$conn = Database::getConnection2();
	//DADOS DO USUÁRIO
	$dado = Usuario::dadosUsuario();

	$idUser = $dado['ID'];
	$setorUser = $dado['SETOR_ID'];	

	$sql = 
	"SELECT
		CH.id, CH.id_solicitante, CH.id_departamento, CH.ID_TECNICO, CH.assunto, CAT.descr AS categoria, CH.ID_STATUS, 
		STS.descr AS status, PRIORI.DESCR AS prioridade, 
		CH.hora_abertura, CH.data_abertura,
		(SELECT ANX.id FROM ANEXOS ANX
		where ANX.chamado_id = CH.ID
		rows 1) AS ANX
	FROM CHAMADOS CH
		left join STATUS STS ON STS.id = CH.id_status
		left join CATEGORIA CAT ON CAT.ID = CH.id_categoria
		left join PRIORIDADE PRIORI ON PRIORI.ID = CH.id_prioridade
    where CH.ID_STATUS <> 7 AND CH.id_solicitante = :ID ORDER BY CH.ID";

	$stms = $conn->prepare($sql);
	$stms->bindValue(':ID', $idUser);	
	$stms->execute();

	$linha = $stms->fetchAll(PDO::FETCH_ASSOC);
		if ($linha >= 0) {
			echo json_encode($linha);
		} else {			
			echo json_encode("Dadossa");
		}
  ?>