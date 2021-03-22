<?php     
	require '../model/userClass.php';
	$id = $_GET['id'];
	//conexão
	$conn = Database::getConnection();


    $sql = 
    "SELECT MSG.ID, MSG.CONTEUDO, MSG.DATA, MSG.HORA, MSG.CHAMADOS_ID,
        MSG.AUTOR_ID, MSG.AUTOR_ID AS NUMAUTOR, MSG.TIPO_USUARIO,
        (SELECT ANX.ID FROM ANEXO_MSG ANX
        where ANX.MENSAGEM_ID =  MSG.ID
        LIMIT 1) AS ARQ, (SELECT ANX.AUTOR_ID FROM ANEXO_MSG ANX
        where ANX.MENSAGEM_ID =  MSG.ID
        LIMIT 1) AS AUTOR_ARQ, (SELECT ANX.NOME_ARQ FROM ANEXO_MSG ANX
        where ANX.MENSAGEM_ID =  MSG.ID
        LIMIT 1) AS NOME_ARQ
    FROM MENSAGEM MSG
        WHERE CHAMADOS_ID = :ID
    ORDER BY MSG.ID";

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