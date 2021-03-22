				<!-- MODAL atribuir CHAMADO -->
				<div id="modal-atribuir" class="modal-container">

					<div id="atribuir" class="modalAtribuir">

						<div class="teto">
							<p>Atribuir chamado</p>
							<button class="fechar"></button>
						</div>

						<form id="formAtribuir" method="POST" accept-charset="utf-8" enctype="multipart/form-data" hidden>

							<div class="contentAtribuir"></div>

							Status: <input type="text" id="statAtr" class="dadosCH" readonly="true" size="10">

							Categoria: <select class="" id="catAtr" name="categoria" required>

								<?php
								$conn = Database::getConnection();

								$sql = "SELECT * FROM categoria order BY id";

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
							Prioridade: <select class="" id="prioAtr" name="prioridade" required>
								<option></option>
								<?php
								$conn = Database::getConnection();

								$sql = "SELECT * FROM prioridade";

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
							Técnico: <select class="" id="tecAtr" name="tecnico" required>								
							</select>
							<input id="btnEnvio" style="cursor: pointer;" class="btnEnvio enviar" type="submit" name="" value="Atribuir">

						</form>
						<p class="msgAviso" id="msgAviso"></p>

					</div>

				</div>