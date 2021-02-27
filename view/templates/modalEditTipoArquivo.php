<!-- MODAL CATEGORIA EDITAR -->
<div id="modal-editTipoArquivo" class="modal-container">

    <div id="editTipoArquivo" class="modalEditTipoArquivo">

        <div class="tetoEditTipoArquivo">

            <p>Editar Categoria</p>
            <button class="fecharEditTipoArquivo"></button>

        </div>

        <form id="formEditTipoArquivo" class="formEditTipoArquivo" method="POST" accept-charset="utf-8" enctype="multipart/form-data" hidden>
            <div id="contentEditTipoArquivo" hidden></div>
            Tipo: <input type="text" name="tipo" id="descTipoEdit" maxlength='35' class="campoT" required><br><br>
            Extensão: <input type="text" name="ext" id="descExtEdit" maxlength='10' class="campoT" required><br><br>
            <input id="btnEditTipoArquivo" class="btnEnvio btnEditarTA" style="cursor: pointer;" type="submit" name="" value="Editar">
        </form>
        <p class="msgTipoArquivo" id="msgTipoArquivo" hidden></p>

    </div>

</div>