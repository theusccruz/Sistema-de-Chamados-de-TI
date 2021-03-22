<?php 


	require '../model/userClass.php';


	$id = $_GET['id'];


	//conexão
	$conn = Database::getConnection();


    $sql = 
    "SELECT ID, AUTOR_ID, AUTOR_ID AS NUMAUTOR, EVENTO, 
        MENSAGEM, DATA, HORA, CHAMADOS_ID 
    FROM INTERACAO
        WHERE CHAMADOS_ID = :ID
    ORDER BY interacao.id";

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