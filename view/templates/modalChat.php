				<!--MODAL CHAT-->
				<div id="modal-Chat" class="modal-container">

					<div id="Chat" class="modalChat">

						<div class="tetoChat">
							<p>Chat</p>
							<button class="fecharChat"></button>
						</div>

						<div id="contentChat">
							Chamado: <label id="numCht"></label>																			
						</div>

						<table id="gridChat" class="gridChat">
							<thead>
								<tr class="cabecaChat">
                                    <td class="conteudoMSG"></td>
								</tr>
							</thead>
							<tbody id="conversas">								
								
							</tbody>
						</table>

						<form method="POST" id="formMessage" accept-charset="utf-8" enctype="multipart/form-data">
							<div class='divMessageContainer'>
								<input type='text' id='campoMessageId' name='id' hidden='true' value="">
								<input type='text' id='campoCriptId' name='cript' hidden="true" value="">
								<a id="atualizaChat"class="atualizaChat"><img class="imgMessageFile" src="../assets/img/atualizar.png"></a>
								<textarea id="messageText" class="messageText" name="msg"></textarea>
								<label for="messageFile" id="lblMessageFile"><img class="imgMessageFile" src="../assets/img/anexoMessage.png"></label>
								<label id="nameFile"></label>
								<input id='messageFile' class='messageFile' name="arquivo" type="file" oninput="contentFile(this);">

								<label for="btnSubmitMessage" class="lblSubmitMessage"><img class="imgSubmitMessage" src="../assets/img/btnEnviarMsg.png"></label>
								<input id='btnSubmitMessage' class='btnSubmitMessage'type="submit" value="enviar">
							</div>

						</form>

					</div>

				</div>