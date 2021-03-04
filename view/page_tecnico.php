<?php

include('../config/conexao.php');

if (isset($_SESSION['IDUSUARIO'])) {
	session_regenerate_id(true);
	if ($_SESSION['SETOR_ID'] === 3) {
?>
		<!DOCTYPE html>
		<html lang="pt-br">

		<head>
			<title>Chamados Suporte TI</title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="../assets/style/styleCMR.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/styleTI.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/nvChamado.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/interacoes.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/anexos.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/chatStyle.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/ordem.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/responsive.css" media="(max-height: 768px)">
			<script src="../assets/scripts/generalFunctions.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/chamadoTIFunctions.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/novoChamado.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/anexos.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/interacoes.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/chat.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/atribuirCH.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/atenderCH.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/finalizarCH.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/ordem.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/fecharEdevolver.js" type="text/javascript" charset="utf-8" defer></script>

		</head>

		<body>

			<?php

			include("./templates/menuLateral.php");

			?>
			<div class="geral">

				<header id="header" class="cabeca">
					<center class="cTitle">						
						<h1 class="title">CHAMADOS WEB SUPORTE</h1>
					</center>
					
				</header>

				<div class="conteudo">

					<div class="chAbertos">
						<h3 class="titleName">CHAMADOS</h3>
						<button class="nvChamado" onclick="novoChamado();">Abrir chamado <img src='../assets/img/novo.png'></button>
						<button class="atualiza" onclick="getAllChamados();">Atualizar</button>

						<form class="userOptions">

							<label>Status:</label>
							<select id="userOptions" onChange="getAllChamados();">

								<option value="1">Mostrar todos</option>

								<?php
								$conn = Database::getConnection();

								$sql = "SELECT * FROM STATUS ORDER BY id";

								$stms = $conn->prepare($sql);
								$stms->execute();

								$status = $stms->fetchAll(PDO::FETCH_ASSOC);

								if (Count($status)) {
									foreach ($status as $sts) :
										if ($sts['id'] !== 7) :
								?>
											<option id="optSts" value="<?php echo $sts['id']; ?>"> <?php echo $sts['descr']; ?> </option>
								<?php
										endif;
									endforeach;
								}
								?>

							</select>

							<label>Filtrar</label>
							<select id="selFilters" onChange="getAllChamados();">
								<option value="1">Padrão</option>
								<option value="2">Atribuídos a mim</option>
								<option value="3">Abertos por mim</option>
							</select>

						</form>

						<table id="gridTI" class="gridTI">

							<thead>
								<tr class="cabecaGrid">
									<td class='numero'>Nº chamado</td>
									<td class='abertura'>Abertura</td>
									<td class='assunto'>Assunto</td>
									<td class='setor'>Setor</td>
									<td class='solicitante'>Solicitante</td>
									<td class='categoria'>Categoria</td>
									<td class='prioridade'>Prioridade</td>
									<td class='status'>Status</td>
									<td class='tecnico'>Técnico responsável</td>
									<td class='chat'>Chat</td>
									<td class='anexo'>Detalhes</td>
									<td class='acoes'>Ações</td>
								</tr>
							</thead>

							<tbody class="dadosTI">
							</tbody>
						</table>

						<table id="gridUser" class="gridUser">
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
					<?php

					include("./templates/modalNovoChamado.php");

					?>
					<?php

					include("./templates/modalAtribuir.php");

					?>
					<?php

					include("./templates/modalAtender.php");

					?>
					<?php

					include("./templates/modalFinalizar.php");

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
					<?php

					include("./templates/modalResolvido.php");

					?>
					<?php

					include("./templates/modalDevolver.php");
					?>

				</div>

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