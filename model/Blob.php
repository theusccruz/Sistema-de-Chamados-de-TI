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
}



// try {
//     $this->pdo->beginTransaction();

//     // create large object
//     $data = $this->pdo->pgsqlLOBCreate();
//     $strm = $this->pdo->pgsqlLOBOpen($data, 'w');

//     // read data from the file and copy the the stream
//     $fh = fopen($pathOfTheFile, 'rb');
//     stream_copy_to_stream($fh, $strm);
//     //
//     $fh = null;
//     $strm = null;

//     $stmt = $this->pdo->prepare($sql);

//     $stmt->execute([
//         ':user_id' => $userid,
//         ':mime_class' => $mimeClass,
//         ':mime_name' => $mimeName,
//         ':mime_data' => $data,
//     ]);

//     // commit the transaction
//     $this->pdo->commit();
// } catch (\Exception $e) {
//     $this->pdo->rollBack();
//     throw $e;
// }
