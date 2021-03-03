<?php

if(!isset($_SESSION['IDUSUARIO'])) {
	session_set_cookie_params(["Secure" => "true"]);
	session_set_cookie_params(["SameSite" => "Strict"]);
	// session_set_cookie_params(["HttpOnly" => "true"]);
	session_start();
} 

Class Database { 
	
	public static function getConnection() {

		$envPath = realpath(dirname(__FILE__) . '/../info.ini' ); //pega o arquivo env e o coloca na variavel path
		$env = parse_ini_file($envPath); //transforma o conteudo da variavel path em um array

		try {  //tentativa de conexão
			$connection = new PDO ("pgsql:host={$env['host']}; port={$env['port']}; 
			dbname={$env['db']};", $env['username'], $env['password']); 
		}
		catch(PDOException $erro) { 
			echo $erro;
		}
		return $connection; 
	}

	public static function getResultFromQuery($sql) { //função pra tratar as query com o DB
		$conn = self::getConnection(); //puxa o objeto PDO de dentro da função getConn..
		$result = $conn->prepare($sql); //prepara o sql do objeto adquirido
		$results = $result->execute(); //executa
		unset($conn); //desconecta do banco
		return $results;
	}
}
?>