<?php

session_start();

header('Content-Type: application/json');

require '../model/userClass.php';
require '../model/functions.php';

//conexão
$conn = Database::getConnection();


//variaveis de usuario da sessão
$dado = Usuario::dadosUsuario();

$idUser = $dado['ID'];
$setorUser = $dado['SETOR_ID'];

date_default_timezone_set('America/Sao_Paulo');
$data = date("Y.m.d");
$time = date("H:i:s");

$cript = $_POST['cript'];
$id = $_POST['id'];

if ($cript != geraHash($id)) {

    echo json_encode("Dados Inválidos");
} else {

    if ($_POST['nota'] == null || ($_POST['nota'] < 0 || $_POST['nota'] > 10)) {

        echo json_encode("Dados Invalidos");
    } else {

        //Fechamento definitivo feito pelo usuário

        $nota = $_POST['nota'];

        $sql =
            "UPDATE CHAMADOS CH SET
                    CH.id_status = :STS,
                    CH.AVALIACAO = :AVA,
                    CH.data_fechamento = :DATAF,
                    CH.hora_fechamento = :HORAF
                WHERE CH.id = :ID";

        $stms = $conn->prepare($sql);
        $stms->bindValue(':STS', '7');
        $stms->bindValue(':AVA', $nota);
        $stms->bindValue(':DATAF', $data);
        $stms->bindValue(':HORAF', $time);
        $stms->bindValue(':ID', $id);
        $stms->execute();

        $linha2 = $stms->fetch(PDO::FETCH_ASSOC);

        if ($linha2 >= 0) {

            echo json_encode("Chamado Finalizado");
        } else {

            echo json_encode("Err");
        }


        if (empty($_POST['msg'])) {

            //INSERT EM INTERAÇÕES
            $sql =
                "INSERT INTO INTERACAO
                    (AUTOR_ID, EVENTO, DATA, HORA, TIPO_USUARIO, CHAMADOS_ID)
                VALUES 
                    (:AUTOR, :EVENTO, :DATA, :HORA, :TPUSER, :CHINT) returning ID";

            $evento = "Solicitante fechou o chamado";
            $tipoUsuarioInt = "Solicitante";

            $stms = $conn->prepare($sql);
            $stms->bindValue(':AUTOR', $idUser);
            $stms->bindValue(':EVENTO', $evento);
            $stms->bindValue(':DATA', $data);
            $stms->bindValue(':HORA', $time);
            $stms->bindValue(':CHINT', $id);
            $stms->bindValue(':TPUSER', $tipoUsuarioInt);
            $stms->execute();

        } else {
            $msg = $_POST['msg'];

            if (strlen($msg) > 9990) {
                echo json_encode("Limite excedido");
            } else {

                //INSERT EM INTERAÇÕES
                $sql =
                    "INSERT INTO INTERACAO
                        (AUTOR_ID, EVENTO, MENSAGEM, DATA, HORA, TIPO_USUARIO, CHAMADOS_ID)
                    VALUES 
                        (:AUTOR, :EVENTO, :MSG, :DATA, :HORA, :TPUSER, :CHINT) returning ID";

                $evento = "Solicitante fechou o chamado";
                $tipoUsuarioInt = "Solicitante";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':AUTOR', $idUser);
                $stms->bindValue(':EVENTO', $evento);
                $stms->bindValue(':MSG', $msg);
                $stms->bindValue(':DATA', $data);
                $stms->bindValue(':HORA', $time);
                $stms->bindValue(':CHINT', $id);
                $stms->bindValue(':TPUSER', $tipoUsuarioInt);
                $stms->execute();
            }
        }
    }
}
