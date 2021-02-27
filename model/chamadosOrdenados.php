<?php

	session_start();
	header('Content-Type: application/json');

	require '../model/userClass.php';

	$conn = Database::getConnection2();
	$sql = "SELECT
				CH.id, CH.id_status, STS.DESCR, PRIORI.DESCR, CH.id_solicitante, CH.id_departamento, CH.ID_TECNICO, CH.assunto, CAT.descr AS categoria,
				STS.descr AS status, PRIORI.DESCR AS prioridade, 
				CH.hora_abertura, CH.data_abertura
			FROM CHAMADOS CH
				left join STATUS STS ON STS.id = CH.id_status
				left join CATEGORIA CAT ON CAT.ID = CH.id_categoria
				left join PRIORIDADE PRIORI ON PRIORI.ID = CH.id_prioridade
			WHERE CH.id_status = 4 OR CH.id_status = 5 OR CH.id_status = 6
			ORDER BY PRIORI.id DESC, CH.ID";

	$stms = $conn->prepare($sql);	
	$stms->execute();
	$linha = $stms->fetchAll(PDO::FETCH_ASSOC);

	$sql = "SELECT
				CH.id, CH.id_status, STS.DESCR, PRIORI.DESCR, CH.id_solicitante, CH.id_departamento, CH.ID_TECNICO, CH.assunto, CAT.descr AS categoria,
				STS.descr AS status, PRIORI.DESCR AS prioridade, 
				CH.hora_abertura, CH.data_abertura
			FROM CHAMADOS CH
				left join STATUS STS ON STS.id = CH.id_status
				left join CATEGORIA CAT ON CAT.ID = CH.id_categoria
				left join PRIORIDADE PRIORI ON PRIORI.ID = CH.id_prioridade
			WHERE CH.id_status <> 4 AND CH.id_status <> 5
			AND CH.id_status <> 6 AND CH.id_status <> 7
			ORDER BY PRIORI.id DESC, CH.ID";

	$stms = $conn->prepare($sql);	
	$stms->execute();
	$linha2 = $stms->fetchAll(PDO::FETCH_ASSOC);

	$dadosEmEspera = json_decode(json_encode($linha2));

	for ($i=0; $i < count($dadosEmEspera); $i++) { 
		$dadosEmEspera[$i]->ORDEM = $i + 1 ."º";
	}

	$dadosEmAtd = json_decode(json_encode($linha));

	for ($i=0; $i < count($dadosEmAtd); $i++) { 
		$dadosEmAtd[$i]->ORDEM = "";
	}

	echo json_encode(array_merge($dadosEmAtd,$dadosEmEspera));

	
	//echo json_encode();


		/*if ($linha >= 0) {				
				
			echo json_encode($linha);	

		} else {			

			echo json_encode("Dadossa");

		}*/


?>