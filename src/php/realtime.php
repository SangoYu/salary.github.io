<?php
  
  include 'mysql.php';

  $sql = "select salary, Date_Format(time, '%T') as stime from salary where salary<50000 order by time desc limit 40";

  $result = mysql_query($sql);
  $arr = array();

  while ($row = mysql_fetch_object($result) ){
    array_push($arr, $row);
  }
  echo json_encode($arr);


  mysql_close($conn);

?>