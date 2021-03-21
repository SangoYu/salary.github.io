<?php

	$mysql_server_name="b-ueofbqkbphu3rs.bch.rds.gz.baidubce.com"; //数据库服务器名称

    $mysql_username="b_ueofbqkbphu3rs"; // 连接数据库用户名

    $mysql_password="password"; // 连接数据库密码



    $conn=mysql_connect($mysql_server_name, $mysql_username,$mysql_password);
    mysql_query("set names utf8");




	 $mysql_database="b_ueofbqkbphu3rs"; // 数据库的名字



	$db_selected = mysql_select_db($mysql_database, $conn);



	if (!$db_selected)

	  {

	  die ("Can\'t use test_db : " . mysql_error());

	  }

?>