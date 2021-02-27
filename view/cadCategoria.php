<?php

//error_reporting(0);
include('../model/userClass.php');

if (isset($_SESSION['IDUSUARIO'])) {
	session_regenerate_id(true);
	if ($_SESSION['SETOR_ID'] == 3) {

?>
		<!DOCTYPE html>
		<html lang="pt-br">

		<head>
			<title>Chamados Suporte TI</title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="../assets/style/styleCMR.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/styleTI.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/modalCategoria.css">
			<link rel="stylesheet" type="text/css" href="../assets/style/responsive.css" media="(max-height: 768px)">
			<script src="../assets/scripts/generalFunctions.js" type="text/javascript" charset="utf-8" defer></script>
			<script src="../assets/scripts/cadCategorias.js" type="text/javascript" charset="utf-8" defer></script>

		</head>

		<body>
			<?php include("./templates/menuLateral.php"); ?>

			<div class="geral">
				<?php include("./templates/header.php"); ?>
				<div class="conteudo">

					<h2 class="titleNameCat">NOVA CATEGORIA</h2>
					<div class="formCad">
						<form id="formCadCateg" action="" class="cadCateg">
							Descrição: <input type="text" name="desc" id="descCat" maxlength='27' class="campoT" autofocus required><br><br>
							<input type="submit" value="Cadastrar" class="btnEnviar">
						</form>
					</div>

					<div class="listCadastros">
						<h3 class="titleNameCat">CATEGORIAS</h3>

						<table class="gridCadCategoria">
							<thead class="cabecaGridCad">
								<tr>
									<td class="descCat">Descrição</td>
									<td class="acao">Editar</td>
									<td class="acao">Excluir</td>
								</tr>
							</thead>
							<tbody id="dadosCategoria" class="dadosCategoria">

							</tbody>
						</table>
					</div>

					<?php
						include("./templates/modalEditCateg.php");
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