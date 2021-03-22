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
$setorUser = $dado['setor_id'];

date_default_timezone_set('America/Sao_Paulo');
$data = date("Y.m.d");
$time = date("H:i:s");

$espacoVazio = trim($_POST["desc"]);

if ((empty($_POST['desc']) == true || $espacoVazio === "")) {

    echo json_encode("Vazio");
} else {
    $descCateg = $_POST['desc'];

    if (strlen($descCateg) > 27) {
        echo json_encode("Limite excedido");
    } else {
        $sql = "INSERT INTO CATEGORIA 
            (DESCR) VALUES (:DESCR) returning ID";

        $stms = $conn->prepare($sql);
        $stms->bindValue(':DESCR', $descCateg);
        $stms->execute();
        $result = $stms->fetch(PDO::FETCH_ASSOC);

        if ($result >= 0) {
            echo json_encode($result);
        } else {
            echo json_encode("Err");
        }
    }
}
