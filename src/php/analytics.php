<?php
  
  include 'mysql.php';

  $sql = "select salary, count, concat(cast( format((count/(select count(*) from salary))*100, 2) as char),'%') as rate from
          (select salary, count(*) as count from (
          select
          case
                 when salary>=3000 and salary <=5000 then '3K-5K'
                 when salary>5000 and salary <= 8000 then '5K-8K'
                 when salary > 8000 and salary <= 12000  then '8K-12K'
                 when salary > 12000 and salary <= 15000 then '12K-15K'
                 when salary > 15000 and salary <=20000 then '15K-20K'
                 when salary > 20000 and salary <=30000 then '20K-30K'
                 when salary > 30000 and salary <=50000 then '30K-50K'
                 when salary > 50000 and salary <=100000 then '50K-100K'
                 else '其他'
          end
          as salary from salary)a
          group by salary)b;";

  $result = mysql_query($sql);
  $arr = array();

  while ($row = mysql_fetch_object($result) ){
    array_push($arr, $row);
  }
  echo json_encode($arr);


  mysql_close($conn);

?>