<?php
    
    include 'mysql.php';

    $data = json_decode(file_get_contents("php://input"), true);

    $ip = $_SERVER["REMOTE_ADDR"];
    $page = $_SERVER['HTTP_REFERER'];

    $affects = mysql_query("UPDATE visit set visits=visits+1 where ip='$ip' and page='$page'");

    if(!mysql_affected_rows()){
        $result = mysql_query("INSERT INTO visit (ip, page) 
            VALUES ('$ip', '$page')");
        echo "result:'$result'";
    }

    echo "affects:'$affects'";

    mysql_close($conn);
?>