				<!-- MODAL ATENDER -->
				<div id="modal-atender" class="modal-container">

					<div id="atender" class="modal">

						<div class="teto">
							<p>Dados do chamado</p>
							<button class="fechar"></button>
						</div>

						<form id="formAtender" method="POST" accept-charset="utf-8" enctype="multipart/form-data" hidden>

							<div class="contentAtender"></div>

							Status: <input type="text" id="statAt" class="dadosCH" readonly="true" size="10">


							Categoria: <select class="" id="catAt" name="categoriaAt" required>

								<?php
								$conn = Database::getConnection();

								$sql = "SELECT * FROM CATEGORIA order BY id";

								$stms = $conn->prepare($sql);
								$stms->execute();

								$categoria = $stms->fetchAll(PDO::FETCH_ASSOC);

								if (Count($categoria)) {
									foreach ($categoria as $categ) {

								?>
										<option id="optCateg" value="<?php echo $categ['id']; ?>"> <?php echo $categ['descr']; ?> </option>
								<?php
									}
								}
								?>
							</select><br><br>
							Prioridade: <select class="" id="prioAt" name="prioAt" required>
								<?php
								$conn = Database::getConnection();

								$sql = "SELECT * FROM PRIORIDADE";

								$stms = $conn->prepare($sql);
								$stms->execute();

								$categoria = $stms->fetchAll(PDO::FETCH_ASSOC);

								if (Count($categoria)) {
									foreach ($categoria as $categ) {

								?>
										<option value="<?php echo $categ['id']; ?>"> <?php echo $categ['descr']; ?> </option>
								<?php
									}
								}
								?>
							</select>
							
							<input id="btnAt" style="cursor: pointer;" class="btnEnvio enviar" type="submit" name="" value="Iniciar atendimento">

						</form>
						<p class="msgAviso" id="msgAtender"></p>

					</div>

				</div>