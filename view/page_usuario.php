<?php

date_default_timezone_set('America/Sao_Paulo');

//error_reporting(0);
include('../config/conexao.php');

if (isset($_SESSION['IDUSUARIO'])) {
	session_regenerate_id(true);
	if ($_SESSION['SETOR_ID'] != 3) {
?>
		<!DOCTYPE html>
		<html lang="pt-br">

		<head>
			<title>Chamados Suporte TI</title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="../assets/style/styleCMR.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/styleUsuario.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/nvChamado.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/interacoes.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/anexos.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/chatStyle.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/ordem.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/responsive.css" media="(max-height: 768px)">
			<script src="../assets/scripts/generalFunctions.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/chamadoUserFunctions.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/novoChamado.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/interacoes.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/chat.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/anexos.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/ordem.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/fecharEdevolver.js" type="text/javascript" charset="utf-8" defer></script>
		</head>

		<body>

			<?php
			include("./templates/menuLateral.php");
			?>
			<div class="geral">
				<?php include("./templates/header.php"); ?>

				<div class="conteudo">

					<div class="chAbertos" id="dados">

						<h3 class="titleName">CHAMADOS</h3>

						<button class="nvChamado" onclick="novoChamado();">Novo chamado <img src='../assets/img/novo.png'></button>
						<button class="atualiza" onclick="getAllChamados();">Atualizar</button>

						<table class="gridUser">
							<thead>
								<tr class="cabecaGrid">
									<td class="numero">Nº chamado</td>
									<td class="abertura">Abertura</td>
									<td class="assunto">Assunto</td>
									<td class="categoria">Categoria</td>
									<td class="status">Status</td>
									<td class="tecnico">Técnico responsável</td>
									<td class="acoes">Detalhes</td>
									<td class="chat">Chat</td>
									<td class="acoes">Ações</td>
									<td class="ordem">Espera</td>
								</tr>
							</thead>
							<tbody class="dados">

							</tbody>
						</table>
					</div>
				</div>
				<?php

				include("./templates/modalNovoChamado.php");

				?>
				<?php

				include("./templates/modalResolvido.php");

				?>
				<?php

				include("./templates/modalDevolver.php");
				?>
				<?php

				include("./templates/modalInteracoes.php");

				?>
				<?php

				include("./templates/modalChat.php");

				?>
				<?php

				include("./templates/modalAnexos.php");

				?>
				<?php

				include("./templates/modalOrdem.php");

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