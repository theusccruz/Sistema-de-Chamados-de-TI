<?php 


	require '../model/userClass.php';


	$id = $_GET['id'];


	//conexão
	$conn = Database::getConnection2();


    $sql = 
    "SELECT A.ID, A.CHAMADO_ID, A.DESCR, A.NOME_ARQ, A.TIPO_ARQ FROM ANEXOS A
            WHERE A.CHAMADO_ID = :ID
    ORDER BY A.ID";

    $stms = $conn->prepare($sql);
        $stms->bindValue(':ID', $id);
    $stms->execute();

    $linha2 = $stms->fetchAll(PDO::FETCH_ASSOC);

    if ($linha2 >= 0) {

        echo json_encode($linha2);
        
    } else {

        echo json_encode("Err");
    }

?>