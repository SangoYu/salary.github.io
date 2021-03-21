<?php
	
	include 'mysql.php';

	$date = date('Y-m-d', time());

	$result = mysql_query("SELECT *,@rownum:=@rownum+1 as id FROM salary,(select @rownum:=0) temp  where time like '$date%' order by time desc");
	$arr = array();

	while ($row = mysql_fetch_object($result) ){
		array_push($arr, $row);
	}
	echo json_encode($arr);


	mysql_close($conn);

?>