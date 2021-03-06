<?php

session_start();

header('Content-Type: application/json');

require '../model/userClass.php';

//conexão
$conn = Database::getConnection();
//variaveis de usuario da sessão
$dado = Usuario::dadosUsuario();

$idUser = $dado['id'];
$setorUser = $dado['setor_id'];

date_default_timezone_set('America/Sao_Paulo');
$data = date("Y.m.d");
$time = date("H:i:s");

if (empty($_GET['id'])) {

    echo json_encode("Dados Invalidos");
} else {
    $id = $_GET['id'];

    $sql = "DELETE FROM TIPO_ANEXO WHERE ID = :ID";

    $stms = $conn->prepare($sql);
    $stms->bindValue(':ID', $id);
    $stms->execute();
    $result = $stms->fetch(PDO::FETCH_ASSOC);

    if ($result >= 0) {
        echo json_encode("delete");
    } else {
        echo json_encode("Err");
    }    
}
