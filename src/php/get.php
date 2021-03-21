<?php
	
	include 'mysql.php';

	$data = json_decode(file_get_contents("php://input"), true);

	$ip = $_SERVER["REMOTE_ADDR"];
	$salary = $data["salary"];
	$insurance = $data["insurancebase"];
	$house = $data["housebase"];
	$aftertax = $data["aftertax"];
	$city = $data["city"];

	$result = mysql_query("INSERT INTO salary (ip, salary, insurancebase, housebase, aftertax, city) 
		VALUES ('$ip', '$salary', '$insurance', '$house', '$aftertax', '$city')");

	echo $result;

	mysql_close($conn);
?>