<?php

session_start();
header('Content-Type: application/json');

require '../model/userClass.php';
require '../model/functions.php';

//conexão
$connUsers = Database::getConnection();
$conn = Database::getConnection();
//variaveis de usuario da sessão
$dado = Usuario::dadosUsuario();
$idUser = $dado['ID'];
$setorUser = $dado['SETOR_ID'];

date_default_timezone_set('America/Sao_Paulo');
$data = date("Y.m.d");
$time = date("H:i:s");

//ID
$cript = $_POST['cript'];
$id = $_POST['id'];

if ($cript != geraHash($id)) {
    echo json_encode("Dados Invalidos");
} else {
    if (empty($_POST['prioridade']) || empty($_POST['cat']) || empty($_POST['tecnico'])) {
        echo json_encode("Dados Invalidos");
    } else {
        //variáveis do POST
        $cat = $_POST['cat'];
        $prioridade = $_POST['prioridade'];
        $tecnico = $_POST['tecnico'];

        //USUARIOS DA TI
        $sql = "SELECT * FROM USUARIO WHERE ID = :ID";
        $stms = $connUsers->prepare($sql);
        $stms->bindValue(':ID', $tecnico);
        $stms->execute();
        $usersTI = $stms->fetch(PDO::FETCH_ASSOC);

        //DADOS DO CHAMADO
        $sql = "SELECT
				CH.ID, CH.id_TECNICO, CAT.id AS categoria, STS.ID AS STATUS, PRIORI.id AS prioridade, CH.FINALIZADO
			FROM CHAMADOS CH
				left join CATEGORIA CAT ON CAT.ID = CH.id_categoria
				left join STATUS STS ON STS.id = CH.id_status
				left join PRIORIDADE PRIORI ON PRIORI.ID = CH.id_prioridade
			WHERE CH.ID = :ID";

        $stms = $conn->prepare($sql);
        $stms->bindValue(':ID', $id);
        $stms->execute();

        $linha = $stms->fetch(PDO::FETCH_ASSOC);

        $idCateg = $linha['CATEGORIA'];
        $idStatus = $linha['STATUS'];
        $idPriori = $linha['PRIORIDADE'];
        $idtecnico = $linha['ID_TECNICO'];

        //atribuir um chamado

        if ($idCateg == $cat) {

            if ($tecnico == $idtecnico) {
                echo json_encode("Sem alteracoes");
            } else {

                if ($idStatus == 2) {
                    $sql2 = "UPDATE chamados CH SET
                            CH.id_tecnico = :TI,
                            CH.id_status = :STS,
                            CH.id_prioridade = :PRIORI
                        WHERE CH.ID = :ID";

                    $stms = $conn->prepare($sql2);
                    $stms->bindValue(':TI', $tecnico);
                    $stms->bindValue(':STS', '3');
                    $stms->bindValue(':PRIORI', $prioridade);
                    $stms->bindValue(':ID', $id);
                    $stms->execute();

                    $linha2 = $stms->fetch(PDO::FETCH_ASSOC);
                    if ($linha2 >= 0) {
                        echo json_encode("Sem update no categ");
                    } else {
                        echo json_encode("Dadossa");
                    }
                } else {

                    $sql2 = "UPDATE chamados CH SET
                            CH.id_tecnico = :TI,
                            CH.id_prioridade = :PRIORI
				        WHERE CH.ID = :ID";

                    $stms = $conn->prepare($sql2);
                    $stms->bindValue(':TI', $tecnico);
                    $stms->bindValue(':PRIORI', $prioridade);
                    $stms->bindValue(':ID', $id);
                    $stms->execute();

                    $linha2 = $stms->fetch(PDO::FETCH_ASSOC);
                    if ($linha2 >= 0) {
                        echo json_encode("Sem update no categ");
                    } else {
                        echo json_encode("Dadossa");
                    }
                }

                //INSERT EM INTERAÇÕES

                $sql = "INSERT INTO INTERACAO
					(AUTOR_ID, EVENTO, DATA, HORA, TIPO_USUARIO, CHAMADOS_ID)
				VALUES 
				    (:AUTOR, :EVENTO, :DATA, :HORA, :TPUSER, :CHINT) returning ID";

                if ($idUser == $tecnico) {
                    $evento = "Atribuiu o chamado a si mesmo";
                } else {
                    $evento = "Atribuiu o chamado ao técnico " . $usersTI['NOME'];
                }
                $tipoUsuarioInt = "Tecnico";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':AUTOR', $idUser);
                $stms->bindValue(':EVENTO', $evento);
                $stms->bindValue(':DATA', $data);
                $stms->bindValue(':HORA', $time);
                $stms->bindValue(':CHINT', $id);
                $stms->bindValue(':TPUSER', $tipoUsuarioInt);
                $stms->execute();
            }
        } else {
            if ($tecnico == $idtecnico) {
                echo json_encode("Sem alteracoes");
            } else {

                if ($idStatus == 2) {
                    $sql2 = "UPDATE chamados CH SET
                            CH.id_tecnico = :TI,
                            CH.id_categoria = :CAT,
                            CH.id_status = :STS,
                            CH.id_prioridade = :PRIORI
				        WHERE CH.ID = :ID";

                    $stms = $conn->prepare($sql2);
                    $stms->bindValue(':TI', $idUser);
                    $stms->bindValue(':CAT', $cat);
                    $stms->bindValue(':STS', '3');
                    $stms->bindValue(':PRIORI', $prioridade);
                    $stms->bindValue(':ID', $id);
                    $stms->execute();

                    $linha2 = $stms->fetch(PDO::FETCH_ASSOC);
                    if ($linha2 >= 0) {
                        echo json_encode("Com update no categ");
                    } else {
                        echo json_encode("Dadossa");
                    }
                } else {
                    $sql2 = "UPDATE chamados CH SET
                            CH.id_tecnico = :TI,
                            CH.id_categoria = :CAT,
                            CH.id_prioridade = :PRIORI
                        WHERE CH.ID = :ID";

                    $stms = $conn->prepare($sql2);
                    $stms->bindValue(':TI', $idUser);
                    $stms->bindValue(':CAT', $cat);
                    $stms->bindValue(':PRIORI', $prioridade);
                    $stms->bindValue(':ID', $id);
                    $stms->execute();

                    $linha2 = $stms->fetch(PDO::FETCH_ASSOC);
                    if ($linha2 >= 0) {
                        echo json_encode("Com update no categ");
                    } else {
                        echo json_encode("Dadossa");
                    }
                }

                //INSERT EM INTERAÇÕES         

                $sql = "INSERT INTO INTERACAO
					(AUTOR_ID, EVENTO, DATA, HORA, TIPO_USUARIO, CHAMADOS_ID)
				VALUES 
				    (:AUTOR, :EVENTO, :DATA, :HORA, :TPUSER, :CHINT) returning ID";

                if ($idUser == $tecnico) {
                    $evento = "Atribuiu o chamado a si mesmo";
                } else {
                    $evento = "Atribuiu o chamado ao técnico " . $usersTI['NOME'];
                }
                $tipoUsuarioInt = "Tecnico";

                $stms = $conn->prepare($sql);
                $stms->bindValue(':AUTOR', $idUser);
                $stms->bindValue(':EVENTO', $evento);
                $stms->bindValue(':DATA', $data);
                $stms->bindValue(':HORA', $time);
                $stms->bindValue(':CHINT', $id);
                $stms->bindValue(':TPUSER', $tipoUsuarioInt);
                $stms->execute();
            }
        }
    }
}
