<?php 


	require '../model/userClass.php';


	$id = $_GET['id'];


	//conexão
	$conn = Database::getConnection2();


	$sql = "SELECT * FROM ANEXO_MSG WHERE ID = :ID";

	$stms = $conn->prepare($sql);
	$stms->bindValue(':ID', $id);
	$stms->execute();

    $linha2 = $stms->fetch(PDO::FETCH_ASSOC);

	$conteudo = $linha2['TIPO_ARQ'];
	$nome = $linha2['NOME_ARQ'];
	$arquivo = $linha2['ARQUIVO'];
    $chamado = $linha2['CHAMADO_ID'];
	
	header('Content-Disposition: attachment; filename= Anexo do Chat - Chamado ' . $chamado . ' - Chamados WEB Suporte - ' . $nome . '');
	header('Content-Type:' . $conteudo);	
    print $arquivo;

?>