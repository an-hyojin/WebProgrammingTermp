<?php
  $id = $_POST['id'];
  $title = $_POST['title'];
  $text = $_POST['text'];

  $fileName = "data/" . $id . "_report.txt";

  $myfile = fopen($fileName , "a+") or die("cannot Open file");
  fwrite($myfile, $title);
  fwrite($myfile, "\n");
  fwrite($myfile, $text);
  fwrite($myfile, "\n");
  fwrite($myfile, "***");

?>
