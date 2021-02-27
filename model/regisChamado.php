<?php


	session_start();
	
	header('Content-Type: application/json');

	//require '../config/conexao.php';

	require '../model/userClass.php';


	//conexão
	$conn = Database::getConnection2();

if (empty($_POST['desc']) || empty($_POST['cat']) || empty($_POST['msg'])) {
	echo json_encode("Dados Invalidos");
	

} else {
	      
	//variaveis do POST
	$desc = $_POST['desc'];
	$cat = $_POST['cat'];
	$msg = $_POST['msg'];

	if (strlen($msg) > 9990 || strlen($cat) > 48) {
		echo json_encode("Limite excedido");
	} else {

		//variaveis de usuario da sessão
		$dado = Usuario::dadosUsuario();

		$idUser = $dado['ID'];
		$setorUser = $dado['SETOR_ID'];	

		//tratamento do INSERT em CHAMADOS
		$sql = "INSERT INTO CHAMADOS 
		(ID_SOLICITANTE, ID_DEPARTAMENTO, ASSUNTO, ID_CATEGORIA, ID_STATUS, HORA_ABERTURA, DATA_ABERTURA) 
			VALUES 
		(:ID_SOL, :ID_DEP, :DESCR, :ID_CAT, :ID_STS, :HRA, :DTA) returning ID";

			
		date_default_timezone_set('America/Sao_Paulo');

		$data = date("Y.m.d");
		$time = date("H:i:s");


		$stms = $conn->prepare($sql);
		$stms->bindValue(':ID_SOL', $idUser);
		$stms->bindValue(':ID_DEP', $setorUser);
		$stms->bindValue(':DESCR', $desc);
		$stms->bindValue(':ID_CAT', $cat);
		$stms->bindValue(':ID_STS', '2');
		$stms->bindValue(':HRA', $time);
		$stms->bindValue(':DTA', $data);
		$stms->execute();


		$id = $stms->fetch(PDO::FETCH_ASSOC);


		$linha = $stms->fetchAll(PDO::FETCH_ASSOC);
			if ($linha > 1) {				
					
				echo json_encode($id);	

			} else {			

				echo json_encode("Dados NÃO");

			}

			
		//INSERT EM INTERAÇÕES
		$sql5 = "INSERT INTO INTERACAO
			(AUTOR_ID, EVENTO, MENSAGEM, DATA, HORA, TIPO_USUARIO, CHAMADOS_ID)
		VALUES 
			(:AUTOR, :EVENTO, :MSG, :DATA, :HORA, :TPUSER, :CHINT) returning ID";

		$evento = "Solicitante abriu um chamado";
		$tipoUsuarioInt = "Solicitante";

		$stms = $conn->prepare($sql5);
		$stms->bindValue(':AUTOR', $idUser);
		$stms->bindValue(':EVENTO', $evento);
		$stms->bindValue(':MSG', $msg);
		$stms->bindValue(':DATA', $data);
		$stms->bindValue(':HORA', $time);
		$stms->bindValue(':CHINT', $id['ID']);
		$stms->bindValue(':TPUSER', $tipoUsuarioInt);
		$stms->execute();
		

		//tratamento do INSERT em MENSAGEM
		$sql = "INSERT INTO MENSAGEM 
		(CONTEUDO, DATA, HORA, CHAMADOS_ID, AUTOR_ID, TIPO_USUARIO)
			VALUES 
		(:CONT, :DATA, :HORA, :CHAM_ID, :ATR_ID, :TIPOUSER) returning ID";

		$tipoUsuario = "Solicitante";

		
		$stms = $conn->prepare($sql);
		$stms->bindValue(':CONT', $msg);
		$stms->bindValue(':DATA', $data);
		$stms->bindValue(':HORA', $time);
		$stms->bindValue(':CHAM_ID', $id['ID']);
		$stms->bindValue(':ATR_ID', $idUser);
		$stms->bindValue(':TIPOUSER', $tipoUsuario);
		$stms->execute();

		if (isset($_FILES['arquivo'])) {

			if (is_uploaded_file($_FILES['arquivo']['tmp_name'][0])) {
				//FILES
				$fileCount = count($_FILES['arquivo']['tmp_name']); 

				for ($i=0; $i < $fileCount; $i++) { 

					if (is_uploaded_file($_FILES['arquivo']['tmp_name'][$i])) {

						if ($_FILES['arquivo']["size"][$i] <= 26214500) {
							//ANEXO
							$arquivo = file_get_contents($_FILES['arquivo']["tmp_name"][$i]);
							$nome = $_FILES['arquivo']["name"][$i];
							$tipo = $_FILES['arquivo']["type"][$i];
							$tamanho = $_FILES['arquivo']["size"][$i];
							$descArquivo = $_POST['descArquivo'][$i];

							if (strlen($_POST['descArquivo'][$i]) > 48) {
								$descArquivo = "";
							} else {
								$descArquivo = $_POST['descArquivo'][$i];
							}
							
							//TIPO DO ANEXO
							$idExtensao = 1;
							$extensao = pathinfo($nome, PATHINFO_EXTENSION);

							$sql = "SELECT * FROM TIPO_ANEXO";

							$stms = $conn->prepare($sql);
							$stms->execute();
							$lineSql = $stms->fetchAll(PDO::FETCH_ASSOC);

							foreach ($lineSql as $line) {

								if ($line['EXTENSAO'] == $extensao) {
									$idExtensao = $line['ID'];		
								} else {
								}	
							}
							//tratamento do INSERT em ANEXOS
							$sql = "INSERT INTO ANEXOS 
								(CHAMADO_ID, TIPOANEXO_ID, ARQUIVO, DESCR, NOME_ARQ, TIPO_ARQ)
							VALUES 
								(:CHM_ID, :TANX_ID, :ARQ, :DESCR, :NMARQ, :TPARQ) returning ID";


							$stms = $conn->prepare($sql);
							$stms->bindValue(':CHM_ID', $id['ID']);
							$stms->bindValue(':TANX_ID', $idExtensao);
							$stms->bindValue(':ARQ', $arquivo);
							$stms->bindValue(':DESCR', $descArquivo);
							$stms->bindValue(':NMARQ', $nome);
							$stms->bindValue(':TPARQ', $tipo);
							$stms->execute(); 
							
						} 
					}
				}
					
			}

		} else {

		}
	}
}
