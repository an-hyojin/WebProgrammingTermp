let listDiv = document.getElementById('main');
let reportList = document.getElementById('listDiv');
let showListDiv = document.getElementById('showListDiv');

function loadBook(){
  let logoutButton = document.getElementById('logoutButton');
  logoutButton.style.display ="block";
  let loginButton = document.getElementById('showLoginButton');
  loginButton.style.display ="none";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let saved = this.responseText;
    let savedArray = saved.split("***");
    for(let i =0; i < savedArray.length; i++){
      if(savedArray[i] !="" && savedArray[i] !="\n"){
        let context = savedArray[i].split("\n");
        let title = context[0];

        let removeButton = document.createElement('button');
        let buttonText =document.createTextNode('삭제');
        let onclickButton = document.createAttribute('onclick');
        onclickButton.value = "removeItem(this)";
        let removeButtonClass = document.createAttribute('class');
        removeButtonClass.value ="removeButton";
        removeButton.setAttributeNode(removeButtonClass);
        removeButton.appendChild(buttonText);
        removeButton.setAttributeNode(onclickButton);
        let container = document.createElement('div');
        let headcontainer = document.createElement('div');
        let headcontainerClass = document.createAttribute('class');
        headcontainerClass.value = "headcontainer";
        headcontainer.setAttributeNode(headcontainerClass);
        let element = document.createElement('h3');
        let elementId = document.createAttribute('id');
        elementId.value = title;
        let textNode = document.createTextNode(title);
        element.setAttributeNode(elementId);
        element.appendChild(textNode);
        let list = document.createElement('div');
        for(let j= 1; j< context.length; j++){
          let contextText = document.createTextNode(context[j]);
          list.appendChild(contextText);
          let insideBr = document.createElement('br');
          list.appendChild(insideBr);
        }
        let divId = document.createAttribute('id');
        let divclass = document.createAttribute('class');
        divId.value = title+".";
        divclass.value = 'listContext';

        let elementOnclick = document.createAttribute('onclick');
        elementOnclick.value = 'ableToggle(this)';
        element.setAttributeNode(elementOnclick);

        list.setAttributeNode(divId);
        list.setAttributeNode(divclass);
        headcontainer.appendChild(element);
        headcontainer.appendChild(removeButton);
        container.appendChild(headcontainer);
        container.appendChild(list);

        let brTag = document.createElement('br');
        container.appendChild(brTag);
        showListDiv.appendChild(container);

      }
    }

      //가져올때 리스트 온 클릭하면 append해주면서 리스트를 보여준다.

    }
  };
  xhttp.open("POST", "loadFile.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let sendstr = "id="+ sessionStorage.getItem('name');
  xhttp.send(sendstr);
}

function loadData(){
  let logoutButton = document.getElementById('logoutButton');
  let showLoginButton = document.getElementById('showLoginButton');
  if(sessionStorage.getItem('name')!=null){
    removeDivChild();
    loadBook();
    logoutButton.style.display ="block";
    showLoginButton.style.display = "none";
    document.getElementById('addButton').style.display = "block";
  }else{
    logoutButton.style.display ="none";
    showLoginButton.style.display = "block";
    let textNode = document.createTextNode('독후감을 보기 위해서는 로그인이 필요합니다!');
    showListDiv.appendChild(textNode);

  }
}

function logoutFunction(){
 let logoutButton = document.getElementById('logoutButton');
 let showLoginButton = document.getElementById('showLoginButton');
 showLoginButton.style.display = "block";
 document.getElementById('addButton').style.display = "none";
 sessionStorage.removeItem('name');
 removeDivChild();
 logoutButton.style.display ="none";
 let textNode = document.createTextNode('독후감을 보기 위해서는 로그인이 필요합니다!');
 showListDiv.appendChild(textNode);
}


function addBook(){
  window.location.href ="AddReport.html";
}

function removeItem(button){
  let removetitle = button.parentElement.childNodes[0].id;
  let removeDiv = document.getElementById(removetitle).parentElement.parentElement;
  showListDiv.removeChild(removeDiv);

  let id = sessionStorage.getItem('name');
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

      console.log("remove");
    }
  };
  xhttp.open("POST", "removeFile.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let sendstr = "id="+id+"&title="+removetitle;

  xhttp.send(sendstr);
}

function ableToggle(divId){
  let div =document.getElementById(divId.id+".");
  if(div.style.display =="none"){
    div.style.display = "block";
  }else{
    div.style.display ="none";
  }
}

function removeDivChild(){
  while(showListDiv.childNodes.length!=0){
    showListDiv.removeChild(showListDiv.childNodes[0]);
  }
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

      loadData();
      let loginFieldSet = document.getElementById('searchModal');
      loginFieldSet.style.display="none";
      let idfield = document.getElementById('idElement');
      idfield.value = "";
      let passwordField = document.getElementById('passwordElement');
      passwordField.value="";

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
