<?php

class DBblob
{
    public function insert($conn, $chamado_id, $extensao, $arquivo, $descr, $nome, $tipo)
    {
        $sql = "INSERT INTO ANEXOS 
					(CHAMADO_ID, TIPOANEXO_ID, ARQUIVO, DESCR, NOME_ARQ, TIPO_ARQ)
				VALUES 
					(:CHM_ID, :TANX_ID, :ARQ, :DESCR, :NMARQ, :TPARQ)";

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->beginTransaction();
        $oid = $conn->pgsqlLOBCreate();
        $strm = $conn->pgsqlLOBOpen($oid, 'w');

        $fh = fopen($arquivo, 'rb');
        stream_copy_to_stream($fh, $strm);
        //
        $fh = null;
        $strm = null;

        $stmt = $conn->prepare($sql);

        $stmt->execute([
            ':CHM_ID' => $chamado_id,
            ':TANX_ID' => $extensao,
            ':ARQ' => $oid,
            ':DESCR' => $descr,
            ':NMARQ' => $nome,
            ':TPARQ' => $tipo,
        ]);

        $conn->commit();
    }

    public function insertBlbInMessage($conn, $chamado_id, $msg_id, $nome, $extensao, $idExtensao, $arquivo, $tipo, $idUser)
    {
        $sql = "INSERT INTO ANEXO_MSG
        (CHAMADO_ID, MENSAGEM_ID, NOME_ARQ, EXTENSAO, TIPOANX_ID, ARQUIVO, TIPO_ARQ, AUTOR_ID)
    VALUES 
        (:CHM_ID, :MSG_ID, :NOME_ARQ, :EXT, :TIPANX_ID, :ARQ, :TPARQ, :ATRID) returning ID";

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->beginTransaction();
        $oid = $conn->pgsqlLOBCreate();
        $strm = $conn->pgsqlLOBOpen($oid, 'w');

        $fh = fopen($arquivo, 'rb');
        stream_copy_to_stream($fh, $strm);
        //
        $fh = null;
        $strm = null;

        $stmt = $conn->prepare($sql);

        $stmt->execute([
            ':CHM_ID' => $chamado_id,
            ':MSG_ID' => $msg_id,
            ':NOME_ARQ' => $nome,
            ':EXT' => $extensao,
            ':TIPANX_ID' => $idExtensao,
            ':ARQ' => $oid,
            ':TPARQ' => $tipo,
            ':ATRID' => $idUser
        ]);

        $conn->commit();
    }
}
