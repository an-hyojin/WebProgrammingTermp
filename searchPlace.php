<?php
  $client_id = "dfdb4nejnu";
  $client_secret = "bXbMhyNhd9G6VsHfYshIsH5HK57gxl3klQBcqWIq";
  $Lat=$_POST['lat'];
  $Lon=$_POST['lon'];
  $keyword = $_POST['keyword'];
  $encText = urlencode($keyword);
  $url = "https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=".$encText."&coordinate=".$Lon.",".$Lat; // json 결과
//  $url = "https://openapi.naver.com/v1/search/blog.xml?query=".$encText; // xml 결과
  $is_post = false;
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, $is_post);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $headers = array();
  $headers[] = "X-NCP-APIGW-API-KEY-ID: ".$client_id;
  $headers[] = "X-NCP-APIGW-API-KEY: ".$client_secret;
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  $response = curl_exec ($ch);
  $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  echo "status_code:".$status_code."
";
  curl_close ($ch);
  if($status_code == 200) {
    $result =  trim($response, "status_code:200\n");
    echo $result;

  } else {
    echo "Error 내용:".$response;
  }
?>
