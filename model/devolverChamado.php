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
    if (empty($_POST['motivo'])) {

        echo json_encode("Dados Invalidos");
    } else {
        $motivo = $_POST['motivo'];

        if (strlen($motivo) > 9990) {
            echo json_encode("Limite excedido");
        } else {

            $sql = "UPDATE CHAMADOS CH SET
                        CH.id_status = :STS,
                        CH.FINALIZADO = :FINALI
                    WHERE CH.id = :ID";

            $stms = $conn->prepare($sql);
            $stms->bindValue(':FINALI', "NAO");
            $stms->bindValue(':STS', '6');
            $stms->bindValue(':ID', $id);
            $stms->execute();

            $linha2 = $stms->fetch(PDO::FETCH_ASSOC);

            if ($linha2 >= 0) {

                echo json_encode("Chamado Devolvido");
            } else {

                echo json_encode("Err");
            }


            //INSERT EM INTERAÇÕES
            $sql =
                "INSERT INTO INTERACAO
                    (AUTOR_ID, EVENTO, MENSAGEM, DATA, HORA, TIPO_USUARIO, CHAMADOS_ID)
                VALUES 
                    (:AUTOR, :EVENTO, :MSG, :DATA, :HORA, :TPUSER, :CHINT) returning ID";

            $evento = "Solicitante devolveu o chamado";
            $tipoUsuarioInt = "Solicitante";

            $stms = $conn->prepare($sql);
            $stms->bindValue(':AUTOR', $idUser);
            $stms->bindValue(':EVENTO', $evento);
            $stms->bindValue(':MSG', $motivo);
            $stms->bindValue(':DATA', $data);
            $stms->bindValue(':HORA', $time);
            $stms->bindValue(':CHINT', $id);
            $stms->bindValue(':TPUSER', $tipoUsuarioInt);
            $stms->execute();
        }
    }
}
