<?php
	
	require '../config/conexao.php';

	class Usuario {

		public static function login($usuario, $senha) { 


			$conn = Database::getConnection();
			$sql = "SELECT * FROM USUARIO WHERE LOGIN = :usuario AND SENHA = :senha";	


			$stms = $conn->prepare($sql);
			$stms->bindValue(':usuario', $usuario);
			$stms->bindValue(':senha', $senha);
			$stms->execute();

			$linha = $stms->fetch(PDO::FETCH_ASSOC);

			if ($linha > 0) {				
				$_SESSION['IDUSUARIO'] = $linha['id'];
				$_SESSION['SETOR_ID'] = $linha['setor_id'];
				$_SESSION['NOME'] = $linha['nome'];
				return $linha;	

			} else {					
				return false;
			}

		}		

		public static function dadosUsuario() {

			$conn = Database::getConnection();
			$sql = "SELECT * FROM USUARIO WHERE ID ='". $_SESSION['IDUSUARIO']."'";

			$stms = $conn->prepare($sql);
			$stms->execute();
			$linha = $stms->fetch(PDO::FETCH_ASSOC);
			
			return $linha;

		}
	}	

?>