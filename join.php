<?php
  $Id = $_POST['id'];
  $passwd = $_POST['passwd'];
  class Join{
    function Join($identifier, $password){
      $this->Id = $identifier;
      $this->Passwd = $password;
    }
    function saveInfo(){
        $myfile = fopen("data/person.txt", "a+") or die ("cannotsave");
        $txt = $this->Id . "|";
        fwrite($myfile, $txt);
        $txt = $this->Passwd ."\n";
        fwrite($myfile, $txt);
        fclose($myfile);
        echo "성공적으로 회원가입 하였습니다.";
    }

    function findId(){
      $myfile = fopen("data/person.txt" , "a+") or die("cannotopen");
      while(!feof($myfile)){
        $info = fgets($myfile);
        $split = explode("|",$info);
        if($this->Id == $split[0]){
          echo "이미 존재하는 아이디입니다!";
          fclose($myfile);
          return true;
        }
      }
      fclose($myfile);
      return false;
    }
  }
  if($Id == "" || $passwd == ""){
    echo "Id또는 password를 입력해주세요";
  }else{
    $newPerson = new Join($Id, $passwd);
    if(!($newPerson->findId())){
      $newPerson->saveInfo();
    }

  }
?>
