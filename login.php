<?php
   if($_POST['id']=="" || $_POST['passwd'] ==""){echo "please input";}
   else{
     $myfile = fopen("data/person.txt" , "a+") or die("cannot Open file");
     while(!feof($myfile)){
       $info = fgets($myfile);
       $split = explode("|",$info);
       $split[1] = trim($split[1], "\n");
       $find = false;
       if($_POST['id']==$split[0]){
         if($_POST['passwd']== $split[1]){
           fclose($myfile);
            echo "Success";
            $find = true;
            break;
          }else{
            echo "비밀번호 입력 오류입니다.";
            $find = true;
            break;
          }
        }
      }
    if(!$find){
      echo "해당하는 아이디가 없습니다.";
    }
    fclose($myfile);
    }

?>
