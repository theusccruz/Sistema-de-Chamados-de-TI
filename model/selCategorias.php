<?php 
	require '../model/userClass.php';
    require '../model/functions.php';

	//conexão
	$conn = Database::getConnection();

    if (!isset($_GET['id'])) {
        $sql = "SELECT * FROM CATEGORIA ORDER BY ID";

        $stms = $conn->prepare($sql);
        $stms->execute();
    
        $linha2 = $stms->fetchAll(PDO::FETCH_ASSOC);
    
        if ($linha2 >= 0) {
            echo json_encode($linha2);        
        } else {
            echo json_encode("Err");
        }

    } else {
        $id = $_GET['id'];

        $sql = "SELECT * FROM CATEGORIA WHERE ID = :ID";

        $stms = $conn->prepare($sql);
        $stms->bindValue(':ID', $id);
        $stms->execute();
    
        $linha = $stms->fetch(PDO::FETCH_ASSOC);

        array_push($linha, geraHash($linha['id']));
    
        if ($linha >= 0) {
            echo json_encode($linha);        
        } else {
            echo json_encode("Err");
        }        
    }
