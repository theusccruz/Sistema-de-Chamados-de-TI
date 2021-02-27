<?php

if(!isset($_SESSION['IDUSUARIO'])) {
	session_start();
} 

Class Database { //criação da classe de conexão do banco
	
	public static function getConnection() { //criação da função de tratamento

		$envPath = realpath(dirname(__FILE__) . '/../info.ini' ); //pega o arquivo env e o coloca na variavel path
		$env = parse_ini_file($envPath); //transforma o conteudo da variavel path em um array


		try {  //tentativa de conexão

			$connection = new PDO ("firebird:localhost={$env['host']}; dbname={$env['db']}; charset=UTF-8", $env['username'], $env['password']); //códigos de comunicação com o banco 

		}

		catch(PDOException $erro) { //se der errado
			echo "ERRO NA CONEXÃO!!!!!!!";

		}

		return $connection; //retorna a variavel de comunicação do banco

	}

	public static function getResultFromQuery($sql) { //função pra tratar as query com o DB
		$conn = self::getConnection(); //puxa o objeto PDO de dentro da função getConn..
		$result = $conn->prepare($sql); //prepara o sql do objeto adquirido
		$results = $result->execute(); //executa
		unset($conn); //desconecta do banco
		return $result;
	}


	//-------------------BANCO 02---------------------------



	public static function getConnection2() { //criação da função de tratamento

		$envPath = realpath(dirname(__FILE__) . '/../info2.ini' ); //pega o arquivo env e o coloca na variavel path
		$env = parse_ini_file($envPath); //transforma o conteudo da variavel path em um array


		try {  //tentativa de conexão

			$connection = new PDO ("firebird:localhost={$env['host']}; dbname={$env['db']}; charset=UTF-8", $env['username'], $env['password']); //códigos de comunicação com o banco 

		}

		catch(PDOException $erro) { //se der errado
			echo "ERRO NA CONEXÃO!!!!!!!";

		}

		return $connection; //retorna a variavel de comunicação do banco

	}

	public static function getResultFromQuery2($sql) { //função pra tratar as query com o DB
		$conn = self::getConnection2(); //puxa o objeto PDO de dentro da função getConn..
		$result = $conn->prepare($sql); //prepara o sql do objeto adquirido
		$results = $result->execute(); //executa
		unset($conn); //desconecta do banco
		return $result;
	}

	}




  ?>