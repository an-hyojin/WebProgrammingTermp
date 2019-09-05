<?php
  $id = $_POST['id'];

  $fileName = "data/" . $id . "_report.txt";

  $myfile = fopen($fileName , "a+") or die("cannot Open file");
  while(!feof($myfile)){
    $line = fgets($myfile);
    echo $line;
  }
?>
