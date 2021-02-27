<?php

date_default_timezone_set('America/Sao_Paulo');

//error_reporting(0);
include('../config/conexao.php');

if (isset($_SESSION['IDUSUARIO'])) {
	session_regenerate_id(true);
	if ($_SESSION['SETOR_ID'] !== 3) {

?>
		<!DOCTYPE html>
		<html lang="pt-br">

		<head>
			<title>Chamados Suporte TI</title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="../assets/style/styleCMR.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/styleUsuario.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/interacoes.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/chatStyle.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/responsive.css" media="(max-height: 768px)">
            <script src="../assets/scripts/generalFunctions.js" type="text/javascript" charset="utf-8" defer></script>
            <script src="../assets/scripts/historico.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/interacoes.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/chat.js" type="text/javascript" charset="utf-8" defer></script>


		</head>

		<body>

			<?php
			include("./templates/menuLateral.php");
			?>
			<div class="geral">
				<?php include("./templates/header.php"); ?>



				<div class="conteudo">
					<h2 class="titleName">HISTÓRICO</h2>

					<table class="gridUser gridHistory">
						<thead class="cabecaGrid">
							<td class='numero'>Nº chamado</td>
							<td class='abertura'>Abertura</td>
							<td class='fechamento'>Fechamento</td>
							<td class='assunto'>Assunto</td>
							<td class='setor'>Setor</td>
							<td class='solicitante'>Solicitante</td>
							<td class='categoria'>Categoria</td>
							<td class='prioridade'>Prioridade</td>
							<td class='status'>Status</td>
							<td class='tecnico'>Técnico responsável</td>
							<td class='anexo'>Detalhes</td>
							<td class='chat'>Chat</td>
						</thead>

						<tbody class="dadosHistory">

						</tbody>
					</table>

					<?php

					include('../view/templates/modalInteracoes.php')


					?>


					<?php

					include("./templates/modalChat.php");

					?>


				</div>

		<?php
	} else {
		header('Location: ../index.php');
	}
} else {
	header('Location: ../index.php');
} ?>
		</body>

		</html>