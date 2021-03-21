<?php
    
    include 'mysql.php';

    $ip =$_SERVER['REMOTE_ADDR'];

    $result = mysql_query("SELECT salary,time,aftertax FROM salary where ip!='$ip' group by ip order by id desc limit 50");
    $arr = array();

    while ($row = mysql_fetch_object($result) ){
        array_push($arr, $row);
    }
    echo json_encode($arr);


    mysql_close($conn);

?>