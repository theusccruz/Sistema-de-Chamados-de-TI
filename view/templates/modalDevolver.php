<!-- MODAL DEVOLVER -->
<div id="modal-devolver" class="modal-container">

    <div id="devolver" class="modalDevolver">

        <div class="tetoDevolver">

            <p>Não resolvido</p>
            <button class="fecharDev"></button>

        </div>

        <form id="formDevolver" method="POST" accept-charset="utf-8" enctype="multipart/form-data" hidden>
            <div class="contentDevolver"></div>            
            Motivo: <textarea id="motivo" name="motivo" class="msgAreaDevolver" rows="3" required></textarea><br><br>
            <input id="btnDevolver" class="btnEnvio enviar" style="cursor: pointer;" type="submit" name="" value="Devolver">
        </form>

        <p class="msgDev" id="msgDev"></p>

    </div>

</div>
