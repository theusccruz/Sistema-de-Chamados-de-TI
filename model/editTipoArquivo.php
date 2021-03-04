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
$espacoVazioTipo = trim($_POST["tipo"]);
$espacoVazioExt = trim($_POST["ext"]);

if ($cript != geraHash($id) || (empty($_POST['tipo']) == true  || $espacoVazioTipo === "") || (empty($_POST['ext']) == true  || $espacoVazioExt === "")) {

    echo json_encode("Dados Invalidos");
} else {

    $sql = "SELECT * FROM TIPO_ANEXO WHERE ID = :ID";

    $stms = $conn->prepare($sql);
    $stms->bindValue(':ID', $id);
    $stms->execute();

    $linha = $stms->fetch(PDO::FETCH_ASSOC);

    $tipo = $_POST['tipo'];
    $ext = $_POST['ext'];

    if (strlen($tipo) > 35 || strlen($ext) > 10) {
        echo json_encode("Limite excedido");
    } else if ($linha['TIPO'] == $tipo && $linha['EXTENSAO'] == $ext) {
        echo json_encode("sem update");
    } else {
        $sql = "UPDATE TIPO_ANEXO SET
                    TIPO = :TIPO,
                    EXTENSAO = :EXT
                WHERE ID = :ID";

        $stms = $conn->prepare($sql);
        $stms->bindValue(':TIPO', $tipo);
        $stms->bindValue(':EXT', $ext);
        $stms->bindValue(':ID', $id);
        $stms->execute();
        $result = $stms->fetch(PDO::FETCH_ASSOC);

        if ($result >= 0) {
            echo json_encode("update ok");
        } else {
            echo json_encode("Err");
        }
    }
}
