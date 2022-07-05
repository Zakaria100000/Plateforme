<?php
	
	session_start();

	$_SESSION = array();

	// On detruit les sessions des utilisateurs 
	session_destroy();

	// Redirige vers la page Login 
	header('location:login.php');
	exit;
?>