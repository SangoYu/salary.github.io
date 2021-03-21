<?php
	
	include 'mysql.php';

	$result = mysql_query("select * from text");
	$arr = array();

	while ($row = mysql_fetch_object($result) ){
		array_push($arr, $row);
	}
	echo json_encode($arr);


	mysql_close($conn);

?>