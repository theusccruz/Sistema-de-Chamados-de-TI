<?php

	session_start();


	header('Content-Type: application/json');

    require '../model/userClass.php';
    require '../model/functions.php';


	$conn = Database::getConnection2();

	$id = $_GET['id'];


	$sql = "SELECT
                CH.id, CH.id_solicitante, CH.id_status, CH.id_departamento, CH.id_tecnico, CH.assunto, CAT.descr AS categoria, CAT.ID AS IDCAT,
                STS.descr AS status, STS.ID AS IDSTS, PRIORI.DESCR AS prioridade, PRIORI.ID AS IDPRIORI, CH.hora_abertura, CH.data_abertura,
                (SELECT ANX.id FROM ANEXOS ANX
                where ANX.chamado_id = CH.ID
                rows 1) AS ANX
            FROM CHAMADOS CH
                left join STATUS STS ON STS.id = CH.id_status
                left join CATEGORIA CAT ON CAT.ID = CH.id_categoria
                left join PRIORIDADE PRIORI ON PRIORI.ID = CH.id_prioridade
            WHERE CH.ID = :ID";


    $stms = $conn->prepare($sql);
    $stms->bindValue(':ID', $id);	
	$stms->execute();


    $linha = $stms->fetch(PDO::FETCH_ASSOC);   

    array_push($linha, geraHash($linha['ID']));


		if ($linha >= 0) {				
				
		    echo json_encode($linha);	

		} else {			

			echo json_encode("Dadossa");

		}



  ?>