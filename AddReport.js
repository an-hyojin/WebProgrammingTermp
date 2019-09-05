function save(){
  let title = document.getElementById('title').value;
  let text = document.getElementById('text').value;
  if(title==""){
    alert('title을 입력하세요');
  }
  else if(text==""){
    alert('text를 입력하세요');
  }else {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.href="BookReport.html";
      }
    };
    xhttp.open("POST", "saveFile.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let sendstr = "title="+title+"&text="+text+"&id="+ sessionStorage.getItem('name');
    xhttp.send(sendstr);
  }
}
