<?php

session_start();

header('Content-Type: application/json');

require '../model/userClass.php';
require '../model/functions.php';

//conexão
$conn = Database::getConnection();
//variaveis de usuario da sessão
$dado = Usuario::dadosUsuario();

$idUser = $dado['id'];
$setorUser = $dado['setor_id'];

date_default_timezone_set('America/Sao_Paulo');
$data = date("Y.m.d");
$time = date("H:i:s");

$cript = $_POST['cript'];
$id = $_POST['id'];

if ($cript != geraHash($id)) {

    echo json_encode("Dados Invalidos");
} else {
    //DADOS DO CHAMADO
    $sql = "SELECT
                CH.ID, CH.ID_STATUS
            FROM CHAMADOS CH
                left join CATEGORIA CAT ON CAT.ID = CH.id_categoria
                left join STATUS STS ON STS.id = CH.id_status
                left join PRIORIDADE PRIORI ON PRIORI.ID = CH.id_prioridade
            WHERE CH.ID = :ID";

    $stms = $conn->prepare($sql);
    $stms->bindValue(':ID', $id);
    $stms->execute();

    $linha = $stms->fetch(PDO::FETCH_ASSOC);
    $idStatus = $linha['id_status'];

    if ($idStatus != 7) {
        $espacoVazio = trim($_POST["msg"]);

        if ((empty($_POST['msg']) == true || $espacoVazio === "") && is_uploaded_file($_FILES['arquivo']['tmp_name']) == false) {

            echo json_encode($id);
        } else if (empty($_POST['msg'])) {
            //Envio somente de arquivo no chat
            if ($_FILES['arquivo']["size"] <= 26214500) {
                //FILES 
                $arquivo = file_get_contents($_FILES['arquivo']["tmp_name"]);
                $nome = $_FILES['arquivo']["name"];
                $tipo = $_FILES['arquivo']["type"];
                $tamanho = $_FILES['arquivo']["size"];

                //TIPO DO ANEXO
                $idExtensao = 1;
                $separate = explode(".", $nome);
                $extensao = $separate[1];

                $sql = "SELECT * FROM TIPO_ANEXO";

                $stms = $conn->prepare($sql);
                $stms->execute();
                $lineSql = $stms->fetchAll(PDO::FETCH_ASSOC);

                foreach ($lineSql as $line) {

                    if ($line['extensao'] == $extensao) {

                        $idExtensao = $line['id'];
                    } else {
                    }
                }

                $sql = "SELECT CH.id_solicitante, CH.ID_TECNICO
                        FROM chamados CH
                    WHERE CH.id =  :ID";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':ID', $id);
                $stms->execute();
                $dadosChamado = $stms->fetch(PDO::FETCH_ASSOC);

                $tipoUsuario;
                if ($idUser == $dadosChamado['id_solicitante']) {
                    $tipoUsuario = "Solicitante";
                } else {
                    $tipoUsuario = "Tecnico";
                }

                //MENSAGEM DO ANEXO
                $sql = "INSERT INTO MENSAGEM 
                        (CONTEUDO, DATA, HORA, CHAMADOS_ID, AUTOR_ID, TIPO_USUARIO)
                    VALUES
                        (:CONTEUDO, :DATA, :HORA, :CHMID, :ATRID, :TIPOUSER) RETURNING ID";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':CONTEUDO', 'Anexo');
                $stms->bindValue(':DATA', $data);
                $stms->bindValue(':HORA', $time);
                $stms->bindValue(':CHMID', $id);
                $stms->bindValue(':ATRID', $idUser);
                $stms->bindValue(':TIPOUSER', $tipoUsuario);
                $stms->execute();

                $linha2 = $stms->fetch(PDO::FETCH_ASSOC);

                //tratamento do INSERT em ANEXOS
                $sql = "INSERT INTO ANEXO_MSG
                        (CHAMADO_ID, MENSAGEM_ID, NOME_ARQ, EXTENSAO, TIPOANX_ID, ARQUIVO, TIPO_ARQ, AUTOR_ID)
                    VALUES 
                        (:CHM_ID, :MSG_ID, :NOME_ARQ, :EXT, :TIPANX_ID, :ARQ, :TPARQ, :ATRID) returning ID";


                $stms = $conn->prepare($sql);
                $stms->bindValue(':CHM_ID', $id);
                $stms->bindValue(':MSG_ID', $linha2['id']);
                $stms->bindValue(':NOME_ARQ', $nome);
                $stms->bindValue(':EXT', $extensao);
                $stms->bindValue(':TIPANX_ID', $idExtensao);
                $stms->bindValue(':ARQ', $arquivo);
                $stms->bindValue(':TPARQ', $tipo);
                $stms->bindValue(':ATRID', $idUser);
                $stms->execute();

                $linha2 = $stms->fetch(PDO::FETCH_ASSOC);

                if ($linha2 >= 0) {

                    echo json_encode($id);
                } else {

                    echo json_encode("Err");
                }

                //INSERT EM INTERAÇÕES EM CASO DE NOVO TÉCNICO QUE ENTRAR NO CHAMADO
                $sql = "SELECT * from interacao
                        WHERE chamados_id = :CHID";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':CHID', $id);
                $stms->execute();
                $dadosInteracao = $stms->fetchAll(PDO::FETCH_ASSOC);

                $condicao;
                $tipoUsuarioInt;

                for ($i = 0; $i < count($dadosInteracao); $i++) {

                    if (
                        $idUser != $dadosChamado['id_solicitante']
                        && $idUser != $dadosChamado['id_tecnico']
                        && $idUser != $dadosInteracao[$i]['autor_id']
                    ) {
                        $condicao = true;
                    } else {
                        $condicao = false;
                    }
                }

                if ($condicao) {
                    $sql = "INSERT INTO INTERACAO
                            (AUTOR_ID, EVENTO, DATA, HORA, TIPO_USUARIO, CHAMADOS_ID)
                        VALUES 
                            (:AUTOR, :EVENTO, :DATA, :HORA, :TPUSER, :CHINT) returning ID";

                    $evento = "Técnico passou a interagir no chamado";
                    $tipoUsuarioInt = "Tecnico";

                    $stms = $conn->prepare($sql);
                    $stms->bindValue(':AUTOR', $idUser);
                    $stms->bindValue(':EVENTO', $evento);
                    $stms->bindValue(':DATA', $data);
                    $stms->bindValue(':HORA', $time);
                    $stms->bindValue(':CHINT', $id);
                    $stms->bindValue(':TPUSER', $tipoUsuarioInt);
                    $stms->execute();
                } else {
                }
            }
        } else {
            //Envio somente de mensagem ou de mensagem com arquivo 

            $msg = $_POST['msg'];

            if (strlen($msg) > 9990) {
                echo json_encode("Limite excedido");
            } else {

                $sql = "SELECT CH.id_solicitante, CH.ID_TECNICO
                            FROM chamados CH
                        WHERE CH.id =  :ID";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':ID', $id);
                $stms->execute();
                $dadosChamado = $stms->fetch(PDO::FETCH_ASSOC);

                $tipoUsuario;
                if ($idUser == $dadosChamado['id_solicitante']) {
                    $tipoUsuario = "Solicitante";
                } else {
                    $tipoUsuario = "Tecnico";
                }

                $sql = "INSERT INTO MENSAGEM 
                    (CONTEUDO, DATA, HORA, CHAMADOS_ID, AUTOR_ID, TIPO_USUARIO)
                    VALUES
                    (:CONTEUDO, :DATA, :HORA, :CHMID, :ATRID, :TIPOUSER) RETURNING CHAMADOS_ID";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':CONTEUDO', $msg);
                $stms->bindValue(':DATA', $data);
                $stms->bindValue(':HORA', $time);
                $stms->bindValue(':CHMID', $id);
                $stms->bindValue(':ATRID', $idUser);
                $stms->bindValue(':TIPOUSER', $tipoUsuario);
                $stms->execute();

                $linha2 = $stms->fetch(PDO::FETCH_ASSOC);

                if ($linha2 >= 0) {

                    echo json_encode($id);
                } else {

                    echo json_encode("Err");
                }

                //INSERT EM INTERAÇÕES EM CASO DE NOVO TÉCNICO QUE ENTRAR NO CHAMADO
                $sql = "SELECT * from interacao
                        WHERE chamados_id = :CHID";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':CHID', $id);
                $stms->execute();
                $dadosInteracao = $stms->fetchAll(PDO::FETCH_ASSOC);

                $condicao;
                $tipoUsuarioInt;

                for ($i = 0; $i < count($dadosInteracao); $i++) {

                    if (
                        $idUser != $dadosChamado['id_solicitante']
                        && $idUser != $dadosChamado['id_tecnico']
                        && $idUser != $dadosInteracao[$i]['autor_id']
                    ) {
                        $condicao = true;
                    } else {
                        $condicao = false;
                    }
                }

                if ($condicao) {
                    $sql = "INSERT INTO INTERACAO
                            (AUTOR_ID, EVENTO, DATA, HORA, TIPO_USUARIO, CHAMADOS_ID)
                        VALUES 
                            (:AUTOR, :EVENTO, :DATA, :HORA, :TPUSER, :CHINT) returning ID";

                    $evento = "Técnico passou a interagir no chamado";
                    $tipoUsuarioInt = "Tecnico";

                    $stms = $conn->prepare($sql);
                    $stms->bindValue(':AUTOR', $idUser);
                    $stms->bindValue(':EVENTO', $evento);
                    $stms->bindValue(':DATA', $data);
                    $stms->bindValue(':HORA', $time);
                    $stms->bindValue(':CHINT', $id);
                    $stms->bindValue(':TPUSER', $tipoUsuarioInt);
                    $stms->execute();
                } else {
                }

                if (isset($_FILES['arquivo'])) {

                    if (is_uploaded_file($_FILES['arquivo']['tmp_name'])) {
                        if ($_FILES['arquivo']["size"][$i] <= 26214500) {
                            //FILES 
                            $arquivo = file_get_contents($_FILES['arquivo']["tmp_name"]);
                            $nome = $_FILES['arquivo']["name"];
                            $tipo = $_FILES['arquivo']["type"];
                            $tamanho = $_FILES['arquivo']["size"];

                            //TIPO DO ANEXO
                            $idExtensao = 1;
                            $separate = explode(".", $nome);
                            $extensao = $separate[1];

                            $sql = "SELECT * FROM TIPO_ANEXO";

                            $stms = $conn->prepare($sql);
                            $stms->execute();
                            $lineSql = $stms->fetchAll(PDO::FETCH_ASSOC);

                            foreach ($lineSql as $line) {

                                if ($line['extensao'] == $extensao) {

                                    $idExtensao = $line['id'];
                                } else {
                                }
                            }

                            //MENSAGEM DO ARQUIVO
                            $sql = "INSERT INTO MENSAGEM 
                                        (CONTEUDO, DATA, HORA, CHAMADOS_ID, AUTOR_ID, TIPO_USUARIO)
                                    VALUES
                                        (:CONTEUDO, :DATA, :HORA, :CHMID, :ATRID, :TIPOUSER) RETURNING ID";

                            $stms = $conn->prepare($sql);
                            $stms->bindValue(':CONTEUDO', 'Anexo');
                            $stms->bindValue(':DATA', $data);
                            $stms->bindValue(':HORA', $time);
                            $stms->bindValue(':CHMID', $id);
                            $stms->bindValue(':ATRID', $idUser);
                            $stms->bindValue(':TIPOUSER', $tipoUsuario);
                            $stms->execute();

                            $linha2 = $stms->fetch(PDO::FETCH_ASSOC);

                            //tratamento do INSERT em ANEXOS
                            $sql = "INSERT INTO ANEXO_MSG
                                (CHAMADO_ID, MENSAGEM_ID, NOME_ARQ, EXTENSAO, TIPOANX_ID, ARQUIVO, TIPO_ARQ, AUTOR_ID)
                            VALUES 
                                (:CHM_ID, :MSG_ID, :NOME_ARQ, :EXT, :TIPANX_ID, :ARQ, :TPARQ, :ATRID) returning ID";


                            $stms = $conn->prepare($sql);
                            $stms->bindValue(':CHM_ID', $id);
                            $stms->bindValue(':MSG_ID', $linha2['id']);
                            $stms->bindValue(':NOME_ARQ', $nome);
                            $stms->bindValue(':EXT', $extensao);
                            $stms->bindValue(':TIPANX_ID', $idExtensao);
                            $stms->bindValue(':ARQ', $arquivo);
                            $stms->bindValue(':TPARQ', $tipo);
                            $stms->bindValue(':ATRID', $idUser);
                            $stms->execute();
                        } else {
                        }
                    }
                } else {
                }
            }
        }
    }
}
