<?php
	
	include 'mysql.php';

	$date = date('Y-m-d', time());

	$result = mysql_query("SELECT *,@rownum:=@rownum+1 as id FROM visit,(select @rownum:=0) temp  where updatedAt like '$date%' order by updatedAt desc");
	$arr = array();

	while ($row = mysql_fetch_object($result) ){
		array_push($arr, $row);
	}
	echo json_encode($arr);


	mysql_close($conn);

?>