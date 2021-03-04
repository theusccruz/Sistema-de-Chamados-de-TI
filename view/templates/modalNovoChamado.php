<div id="modal-NvChamado" class="modal-container">

    <div id="telaNvChamado" class="modalNvChamado modalTamanhoInicial">

        <div class="tetoNvChamado">
            <p>Abrir novo chamado</p>
            <button class="fecharNvChamado"></button>
        </div>
        
        <form action="" id="formulario" class="formNvChamado" method="POST" accept-charset="utf-8" enctype="multipart/form-data" hidden>

            <label>Descrição: </label>
            <input id="descricao" type="text" name="desc" size="41" maxlength="48" class="campoT" required autofocus=""><br><br>
            <label>Categoria: </label>
            <select class="categorias" id="categoria" name="categoria" required>

                <option></option>
                <?php
                $conn = Database::getConnection();

                $sql = "SELECT * FROM CATEGORIA order BY ID";

                $stms = $conn->prepare($sql);
                $stms->execute();

                $categoria = $stms->fetchAll(PDO::FETCH_ASSOC);

                if (Count($categoria)) {
                    foreach ($categoria as $categ) {

                ?>
                    <option value="<?php echo $categ['ID']; ?>"> <?php echo $categ['DESCR']; ?> </option>
                <?php
                    }
                }
                ?>
            </select><br><br>
            <label>Mensagem: </label><textarea id="mensagem" name="msg" class="msgArea" rows="3" cols="50" required></textarea><br><br>
            <label>Anexo (opcional) max 25MB:</label>
            <a class="addAnx" onclick="addAnexo();"><img class="imgAnx" src="../assets/img/add.png"></a><br>
            <div id="anexoLabel" class="divConteudoAnexos"></div>
            <br><input type="submit" id="enviar" name="enviar" class="btnEnviar" value="Abrir chamado">

        </form>

        <p class="msgSubmit" id="msgSubmit"></p>
        

    </div>

</div>