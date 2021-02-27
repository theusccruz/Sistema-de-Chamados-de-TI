<!--MODAL RESOLVIDO-->
<div id="modal-fechar" class="modal-container">

    <div id="final" class="modalFechar">

        <div class="tetoFechar">

            <p>Resolvido</p>
            <button class="fecharResolv"></button>

        </div>

        <form id="formFechar" method="POST" accept-charset="utf-8" enctype="multipart/form-data" hidden>

            <div class="contentFechar"></div>

            Assunto: <label id="assuntoUser"></label><br><br>
            Solicitante: <label id="solicitanteUser"></label><br><br>
            Setor: <label id="setorUser"></label><br><br>
            Técnico Responsável: <label id="tiUser"></label><br><br>

            Deixe sua avaliação (0-10): 
            <input type="range" max="10" min="0" name="nota" id="nota" class ="nota" required>
            <span id="textNota"></span>
            <!-- <input type="number" max="10" min="0" name="nota" id="nota" required> -->
            <br><br>
            Observação: <textarea id="observacao" name="msg" class="obsResolverChamado" rows="3" cols="50"></textarea>
            <label class="alerta"></label><br>
            <input id="btnFinal" class="btnEnvio enviar" type="submit" name="" style="cursor: pointer;" value="Finalizar chamado">
        </form>

        <p class="msgFechar" id="msgFechar"></p>

    </div>

</div>
