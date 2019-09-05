<?php
  $client_id = "U8NqauK8PCRx6_K4U49W";
  $client_secret = "zcsyrPjth5";
  $title = $_POST['search'];
  $encText = urlencode($title);
  $url = "http://book.interpark.com/api/bestSeller.api?key=FF90080C5D11247DF05571D9A4C1BB7CB0C773A5821293A883E25CF719BB2EB5&categoryId=100&categoryId=100&output=json";
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  $response = curl_exec ($ch);
  $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  echo "status_code:".$status_code."
";
  curl_close ($ch);
  if($status_code == 200) {
    echo $response;
  } else {
    echo "Error 내용:".$response;
  }
?>
