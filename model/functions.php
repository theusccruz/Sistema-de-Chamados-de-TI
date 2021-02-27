<?php

    function geraHash($text) {

        $pass = "@ChamadosSup2020";
        $num = hash_hmac('sha256', $text, $pass);

        return $num;
    }

    function ret () {
        echo json_encode('ola');
    }

?>