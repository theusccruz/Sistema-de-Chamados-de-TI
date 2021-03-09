<?php
require '../model/userClass.php';
$id = $_GET['id'];

//conexão
$conn = Database::getConnection();
$conn->beginTransaction();

$sql = "SELECT * FROM ANEXOS WHERE ID = :ID";

$stms = $conn->prepare($sql);
$stms->bindValue(':ID', $id);
$stms->execute();

$stms->bindColumn('tipo_arq', $type, \PDO::PARAM_STR);
$stms->bindColumn('nome_arq', $nome, \PDO::PARAM_STR);
$stms->bindColumn('descr', $desc, \PDO::PARAM_STR);
$stms->bindColumn('arquivo', $arquivo, \PDO::PARAM_STR);
$stms->bindColumn('chamado_id', $chamado, \PDO::PARAM_STR);
$stms->fetch(\PDO::FETCH_BOUND);
$stream = $conn->pgsqlLOBOpen($arquivo, 'r');

// $linha = $stms->fetch(PDO::FETCH_ASSOC);
// $conteudo = $linha['tipo_arq'];
// $nome = $linha['nome_arq'];
// $desc = $linha['descr'];
// $arquivo = $linha['arquivo'];
// $chamado = $linha['chamado_id'];




header('Content-Disposition: attachment; filename= Anexo do chamado ' 
. $chamado . ' - Chamados WEB Suporte - ' . $desc . ' - ' . $nome . '');

header('Content-Type:' . $type);
fpassthru($stream);
