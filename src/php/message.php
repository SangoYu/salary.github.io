<?php
	
	include 'mysql.php';

	$data = json_decode(file_get_contents("php://input"), true);

	$ip = $_SERVER["REMOTE_ADDR"];
	$name = $data["name"];
	$contact = $data["contact"];
	$message = $data["message"];
	mysql_query("set names utf8");
	$result = mysql_query("INSERT INTO message (ip, name, contact, message) 
		VALUES ('$ip', '$name', '$contact', '$message')");

	echo $result;

	mysql_close($conn);
?>