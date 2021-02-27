<?php
	//error_reporting(0);
 ?>
<div class="menuCont">			
		<ul class="colunMenu">

			<?php
			$setorUser = $_SESSION['SETOR_ID'];				
			if ($setorUser == 3) {	
			?>
				<div class="titleMenu">

					<a href="page_tecnico.php" class="home"><img src="../assets/img/home.png" alt="" width="50rem" height="50rem" class="icon"></a>
					<a href="../index.php" class="sair"><img src="../assets/img/sair4.png" alt="" width="60rem" height="60rem" class="icon"></a>

				</div>
				<h2 class='nameUser'>Olá <?= $_SESSION['NOME']; ?></h2>

				<li><a href="../view/page_tecnico.php" title="" style="text-decoration: none;" class="opcao">Chamados</a></li>
				<li class="menuPai"><a title="" style="text-decoration: none;" class="opcao">Cadastros</a>
					<ul class="submenu">
						<li><a href="../view/cadCategoria.php" title="" style="text-decoration: none;" class="opcao">Categorias</a></li>
						<li><a href="../view/cadTipoArquivo.php" title="" style="text-decoration: none;" class="opcao">Tipos de Arquivo</a></li>
					</ul>
				</li>
				<li><a href="" title="" style="text-decoration: none;" class="opcao">Relatórios</a></li>
				<li><a href="" title="" style="text-decoration: none;" class="opcao">Gráficos</a></li>				
				<li><a href='../view/historicoTI.php' title="" style="text-decoration: none;" class="opcao">Histórico</a></li>

			<?php 
			} else { ?>

				<div class="titleMenu">
					<a href="page_usuario.php" class="home"><img src="../assets/img/home.png" alt="" width="50rem" height="50rem" class="icon"></a>
					<a href="../index.php" class="sair"><img src="../assets/img/sair4.png" alt="" width="60rem" height="60rem" class="icon"></a>				
				</div>

				<h2 class='nameUser'>Olá <?= $_SESSION['NOME']; ?></h2>

				<li><a href="../view/page_usuario.php" title="" style="text-decoration: none;" class="opcao">Chamados</a></li>
				<li><a href='../view/historicoUser.php' title="" style="text-decoration: none;" class="opcao">Histórico</a></li>

			<?php 
			} ?>
				

		</ul>			

</div>
