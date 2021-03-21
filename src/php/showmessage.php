<?php
	
	include 'mysql.php';

	$date = date('Y-m-d', time());


	mysql_query("set names utf8");
	$result = mysql_query("SELECT name, time, message FROM message order by time desc");
	$arr = array();

	while ($row = mysql_fetch_object($result) ){
		array_push($arr, $row);
	}
	echo json_encode($arr);


	mysql_close($conn);

?>