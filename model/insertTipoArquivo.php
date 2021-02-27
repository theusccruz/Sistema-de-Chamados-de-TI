<?php

session_start();
header('Content-Type: application/json');
require '../model/userClass.php';
require '../model/functions.php';

//conexão
$conn = Database::getConnection2();

//variaveis de usuario da sessão
$dado = Usuario::dadosUsuario();

$idUser = $dado['ID'];
$setorUser = $dado['SETOR_ID'];

date_default_timezone_set('America/Sao_Paulo');
$data = date("Y.m.d");
$time = date("H:i:s");

$espacoVazioTipo = trim($_POST["tipo"]);
$espacoVazioExt = trim($_POST["ext"]);

if ((empty($_POST['tipo']) == true  || $espacoVazioTipo === "") || (empty($_POST['ext']) == true  || $espacoVazioExt === "")) {

    echo json_encode("Vazio");
} else {
    $tipo = $_POST['tipo'];
    $ext = $_POST['ext'];

    if (strlen($tipo) > 35 || strlen($ext) > 10) {
        echo json_encode("Limite excedido");
    } else {
        $sql = "INSERT INTO TIPO_ANEXO 
            (TIPO, EXTENSAO) VALUES (:TIPO, :EXTENSAO) returning ID";

        $stms = $conn->prepare($sql);
        $stms->bindValue(':TIPO', $tipo);
        $stms->bindValue(':EXTENSAO', $ext);
        $stms->execute();
        $result = $stms->fetch(PDO::FETCH_ASSOC);

        if ($result >= 0) {
            echo json_encode($result);
        } else {
            echo json_encode("Err");
        }
    }
}
