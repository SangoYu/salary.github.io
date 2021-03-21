<?php
	
	// include 'mysql.php';
	$mysql_server_name="qdm166846415.my3w.com"; //数据库服务器名称
    $mysql_username="qdm166846415"; // 连接数据库用户名
    $mysql_password="qdm166846415"; // 连接数据库密码

    $conn=mysql_connect($mysql_server_name, $mysql_username,$mysql_password);


	 $mysql_database="qdm166846415_db"; // 数据库的名字

	$db_selected = mysql_select_db($mysql_database, $conn);

	if (!$db_selected)
	  {
	  die ("Can\'t use test_db : " . mysql_error());
	  }

	$data = json_decode(file_get_contents("php://input"), true);

	$ip = $_SERVER["REMOTE_ADDR"];
	$salary = $data["salary"];
	$insurance = $data["insurancebase"];
	$house = $data["housebase"];
	$aftertax = $data["aftertax"];

	$result = mysql_query("INSERT INTO salary (ip, salary, insurancebase, housebase, aftertax) 
		VALUES ('$ip', '$salary', '$insurance', '$house', '$aftertax')");

	echo $result;

	mysql_close($conn);

?>