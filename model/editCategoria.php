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
$espacoVazio = trim($_POST["desc"]);

if ($cript != geraHash($id) || empty($_POST['desc']) == true || $espacoVazio === "") {

    echo json_encode("Dados Invalidos");
} else {

    $sql = "SELECT * FROM CATEGORIA WHERE ID = :ID";

    $stms = $conn->prepare($sql);
    $stms->bindValue(':ID', $id);
    $stms->execute();

    $linha = $stms->fetch(PDO::FETCH_ASSOC);

    $descCateg = $_POST['desc'];

    if (strlen($descCateg) > 27) {
        echo json_encode("Limite excedido");
    } else if ($linha['descr'] == $descCateg) {
        echo json_encode("sem update");
    } else {
        $sql = "UPDATE CATEGORIA SET
                    DESCR = :DESCR
                WHERE ID = :ID";

        $stms = $conn->prepare($sql);
        $stms->bindValue(':DESCR', $descCateg);
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
