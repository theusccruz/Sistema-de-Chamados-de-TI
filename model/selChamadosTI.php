<?php
	header('Content-Type: application/json');
	require '../model/userClass.php';


	$conn = Database::getConnection();

	$sql = "SELECT
                CH.id, CH.id_solicitante, CH.id_departamento, CH.ID_TECNICO, 
                CH.assunto, CH.ID_STATUS, CH.ID_PRIORIDADE,
                CH.ID_CATEGORIA, CAT.descr AS categoria,
                STS.descr AS status, PRIORI.DESCR AS prioridade, 
                CH.hora_abertura, CH.data_abertura,
                (SELECT ANX.id FROM ANEXOS ANX
                where ANX.chamado_id = CH.ID
                LIMIT 1) AS ANX
            FROM CHAMADOS CH
                left join STATUS STS ON STS.id = CH.id_status
                left join CATEGORIA CAT ON CAT.ID = CH.id_categoria
                left join PRIORIDADE PRIORI ON PRIORI.ID = CH.id_prioridade
                WHERE CH.ID_STATUS <> 7
            ORDER BY CASE WHEN CH.id_prioridade IN (6) THEN 1 ELSE 0 END DESC, 
                CASE WHEN CH.ID_STATUS IN (2) THEN 1 ELSE 0 END DESC, 
                PRIORI.id DESC, CH.ID DESC";

	$stms = $conn->prepare($sql);	
	$stms->execute();


	$linha = $stms->fetchAll(PDO::FETCH_ASSOC);
		if ($linha >= 0) {
			echo json_encode($linha);
		} else {
			echo json_encode("Dadossa");
		}
