<!-- MODAL CATEGORIA EDITAR -->
<div id="modal-editCategoria" class="modal-container">

    <div id="editCategoria" class="modalEditCategoria">

        <div class="tetoEditCategoria">

            <p>Editar Categoria</p>
            <button class="fecharEditCategoria"></button>

        </div>

        <form id="formEditCategoria" class="formEditCategoria" method="POST" accept-charset="utf-8" enctype="multipart/form-data" hidden>
            <div id="contentEditCateg" hidden></div>
            Descrição: <input type="text" name="desc" id="descCatEdit" maxlength='27' class="campoT" required><br><br>
            <input id="btnEditCategoria" class="btnEnvio btnEditarCateg" style="cursor: pointer;" type="submit" name="" value="Editar">
        </form>
        <p class="msgCateg" id="msgCateg" hidden></p>

    </div>

</div>