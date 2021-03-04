<?php
	session_start();	
	header('Content-Type: application/json');
	require '../model/userClass.php';

	//conexão
	$conn = Database::getConnection();
    
    echo json_encode($_SESSION);
