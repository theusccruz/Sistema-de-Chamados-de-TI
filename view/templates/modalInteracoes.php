				<!--MODAL INTERACOES-->
				<div id="modal-intera" class="modal-container">

					<div id="intera" class="modalIntera">

						<div class="tetoIntera">
							<p>Detalhes do Chamado</p>
							<button class="fecharIntera"></button>
						</div>

						<div id="contentIntera">
							Chamado: <label id="numInt"></label><br>
							Categoria: <label id="catInt"></label><br>
							Solicitante: <label id="solicInt"></label>						
							Status: <label id="stsInt"></label>
							Técnico responsável: <label id="tecInt"></label>
							<label id="iconAnexo" class="iconeAnexo"></label>							
						</div>						

						<table class="gridIntera">

							<thead>
								<tr class="cabecaIntera">
									<td class="hora">Data/Hora</td>
									<td class="autor">Autor</td>
									<td class="acao">Evento</td>
									<td class="mensagem">Mensagem</td>
								</tr>
							</thead>
							<tbody id="interacoes">								
								
							</tbody>

						</table>

					</div>

				</div>

				<!-- MODAL VER MAIS MENSAGEM -->
				<div id="modal-mais" class="modal-containerMais">

					<div id="mais" class="modalMais">

						<div class="tetoMais">
							<p>Mensagem</p>
							<button class="fecharMais"></button>
						</div>

						<div class="contentlMais">

						<p class='plM'>Chamado: <label id="maisChamado"></label></p>
						<p class='plM'>Autor: <label id="maisAutor"></label></p>

						<p id="maisMensagem"></p>
						
						</div>

					</div>

				</div>			
