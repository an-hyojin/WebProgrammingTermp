function isLogin(){
  let logoutButton = document.getElementById('logoutButton');
  let showLoginButton = document.getElementById('showLoginButton');
  if(sessionStorage.getItem('name')!=null){
    logoutButton.style.display ="block";
    showLoginButton.style.display = "none";
  }else{
    logoutButton.style.display ="none";
    showLoginButton.style.display = "block";
  }
}

function logoutFunction(){
 sessionStorage.removeItem('name');
 let showLoginButton = document.getElementById('showLoginButton');
 let logoutButton = document.getElementById('logoutButton');
 showLoginButton.style.display ="block";
 logoutButton.style.display ="none";
}

function showLoginModal(){
    let loginFieldSet = document.getElementById('searchModal');
    loginFieldSet.style.display = "block";
}

function loginFunction(){
  let id = document.getElementById('idElement').value;
  let password = document.getElementById('passwordElement').value;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    if(this.responseText=="Success"){
      sessionStorage.setItem('name',id);
      alert("성공적으로 로그인 하였습니다.");
      let loginFieldSet = document.getElementById('searchModal');
      loginFieldSet.style.display="none";
      let idfield = document.getElementById('idElement');
      idfield.value = "";
      let passwordField = document.getElementById('passwordElement');
      passwordField.value="";
      let showLoginButton = document.getElementById('showLoginButton');
      showLoginButton.style.display="none";
      let logoutButton = document.getElementById('logoutButton');
      logoutButton.style.display="block";
    }else{
      alert(this.responseText);
      }
    }
  };
  xhttp.open("POST", "login.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let sendstr = "id="+id+"&passwd="+password;
  xhttp.send(sendstr);
}


function joinFunction(){
  let id = document.getElementById('idElement');
  let password = document.getElementById('passwordElement');
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    alert(this.responseText);
    let loginFieldSet = document.getElementById('searchModal');
    loginFieldSet.style.display = "none";
    id.value ="";
    password.value = "";
    }
  };
  xhttp.open("POST", "join.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let sendstr = "id="+id.value+"&passwd="+password.value;
  xhttp.send(sendstr);
}

window.onclick = function(event) {//modal박스 밖을 클릭했을 때
  let modal = document.getElementById('searchModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
