<?php 


	require '../model/userClass.php';


	$id = $_GET['id'];


	//conexão
	$conn = Database::getConnection();


	$sql = "SELECT * FROM ANEXOS WHERE ID = :ID";

	$stms = $conn->prepare($sql);
	$stms->bindValue(':ID', $id);
	$stms->execute();

	$linha = $stms->fetch(PDO::FETCH_ASSOC);

	$conteudo = $linha['TIPO_ARQ'];
	$nome = $linha['NOME_ARQ'];
	$desc = $linha['DESCR'];
	$arquivo = $linha['ARQUIVO'];
	$chamado = $linha['CHAMADO_ID'];

	
	header('Content-Disposition: attachment; filename= Anexo do chamado ' . $chamado . ' - Chamados WEB Suporte - ' . $desc . ' - ' . $nome . '');
	header('Content-Type:' . $conteudo); 	
	print $arquivo;


?>