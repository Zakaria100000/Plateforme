<?php 
$db_server = 'localhost'; 
$db_name = 'moalim'; 
$db_user = 'root'; 
$db_password = 'root'; 

$conn = mysqli_connect($db_server, $db_user, $db_password, $db_name); 
if (!$conn) {
	
	exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}