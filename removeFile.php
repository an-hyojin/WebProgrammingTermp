<?php
  $id = $_POST['id'];
  $title = $_POST['title'];

  $fileName = "data/" . $id . "_report.txt";

  $myfile = fopen($fileName , "a+") or die("cannot Open file");
  $str = "";
  while(!feof($myfile)){
    $str .= fgets($myfile);
  }
  fclose($myfile);

  $resavestr = "";
  $split = explode("***",$str);

  for($i=0; $i< sizeof($split); $i++){
    $temp = explode("\n", $split[$i]);
    if(!($temp[0] == $title)){
      for($j=0; $j<sizeof($temp); $j++){
          if($temp[$j]!='\n' &&$temp[$j]!=''&&$temp[$j]!='***'){
            $resavestr .=$temp[$j] . "\n";
          }
      }
      $resavestr .="***";
    }
  }
  $resavefile = fopen($fileName , "w+") or die("cannot Open file");

  fwrite($resavefile, $resavestr);
  fclose($resavefile);

?>
