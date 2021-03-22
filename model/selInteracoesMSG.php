<?php 


	require '../model/userClass.php';


    $id = $_GET['id'];
    $autor = $_GET['autor'];


	//conexão
	$conn = Database::getConnection();


    $sql = 
    "SELECT * FROM INTERACAO
        WHERE INTERACAO.ID = :ID 
        AND INTERACAO.AUTOR_ID = :AUTOR
    ORDER BY INTERACAO.ID";


    $stms = $conn->prepare($sql);
        $stms->bindValue(':ID', $id);
        $stms->bindValue(':AUTOR', $autor);
    $stms->execute();

    $linha2 = $stms->fetch(PDO::FETCH_ASSOC);

    if ($linha2 >= 0) {

        echo json_encode($linha2);
        
    } else {

        echo json_encode("Err");
    }

?>