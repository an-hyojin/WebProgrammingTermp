function loadBook(){
  let logoutButton = document.getElementById('logoutButton');
  let showLoginButton = document.getElementById('showLoginButton');
  if(sessionStorage.getItem('name')!=null){
    logoutButton.style.display ="block";
    showLoginButton.style.display = "none";
  }else{
    logoutButton.style.display ="none";
    showLoginButton.style.display = "block";
  }

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let table = document.getElementById('showTable');
    let result = JSON.parse(this.responseText.slice(0,-18));
    let head = document.createElement('thead');
    let row =document.createElement('tr');

    let sort0 = document.createElement('th');
    let sort0_text = document.createElement('순위');
    sort0.appendChild(sort0_text);
    row.appendChild(sort0);

    let sort1 = document.createElement('th');
    let sort1_text = document.createTextNode('책');
    sort1.appendChild(sort1_text);
    row.appendChild(sort1);

    let sort2 = document.createElement('th');
    let sort2_text = document.createTextNode('제목');
    sort2.appendChild(sort2_text);
    row.appendChild(sort2);

    let sort3 = document.createElement('th');
    let sort3_text = document.createTextNode('저자');
    sort3.appendChild(sort3_text);
    row.appendChild(sort3);

    let sort4 = document.createElement('th');
    let sort4_text = document.createTextNode('출판사');
    sort4.appendChild(sort4_text);
    row.appendChild(sort4);

    let sort5 = document.createElement('th');
    let sort5_text = document.createTextNode('가격');
    sort5.appendChild(sort5_text);
    row.appendChild(sort5);
    head.appendChild(row);
    table.appendChild(head);
    for(let i = 0; i< result["item"].length; i++){
      let tr = document.createElement('tr');
      let ranktd = document.createElement('td');
      let rank = document.createTextNode(result['item'][i]["rank"]);
      ranktd.appendChild(rank);
      tr.appendChild(ranktd);

      let imagetd = document.createElement('td');
      let image = document.createElement('img');
      let srcatt = document.createAttribute('src');
      srcatt.value = result["item"][i]["coverSmallUrl"];
      image.setAttributeNode(srcatt);
      imagetd.appendChild(image);
      tr.appendChild(imagetd);

      let titletd = document.createElement('td');
      let title = document.createTextNode(result['item'][i]["title"]);
      titletd.appendChild(title);
      tr.appendChild(titletd);

      let authortd = document.createElement('td');
      let author = document.createTextNode(result["item"][i]["author"]);
      authortd.appendChild(author);
      tr.appendChild(authortd);

      let publishertd = document.createElement('td');
      let publisher = document.createTextNode(result["item"][i]["publisher"]);
      publishertd.appendChild(publisher);
      tr.appendChild(publishertd);

      let pricetd = document.createElement('td');
      let price = document.createTextNode(result["item"][i]["priceStandard"]);
      pricetd.appendChild(price);
      tr.appendChild(pricetd);
      table.appendChild(tr);
    }
    }
  };
  xhttp.open("POST", "bestSeller.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
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

function removeDivChild(){
  let table = document.getElementById('showTable');
  while(table.childNodes.length!=0){
    table.removeChild(table.childNodes[0]);
  }
}
function findBook(){
  let input = document.getElementById('booktitle').value;

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      removeDivChild();

      let result = this.responseText.slice(17);
      let parseData = JSON.parse(result);

      let table = document.getElementById('showTable');
      if(parseData["display"]==0){
        let text = document.createTextNode('결과 없음');
        table.appendChild(text);
        return;
      }
      let head = document.createElement('thead');
      let row =document.createElement('tr');
      let sort1 = document.createElement('th');
      let sort1_text = document.createTextNode('책');
      sort1.appendChild(sort1_text);
      row.appendChild(sort1);

      let sort2 = document.createElement('th');
      let sort2_text = document.createTextNode('제목');
      sort2.appendChild(sort2_text);
      row.appendChild(sort2);

      let sort3 = document.createElement('th');
      let sort3_text = document.createTextNode('저자');
      sort3.appendChild(sort3_text);
      row.appendChild(sort3);

      let sort4 = document.createElement('th');
      let sort4_text = document.createTextNode('출판사');
      sort4.appendChild(sort4_text);
      row.appendChild(sort4);

      let sort5 = document.createElement('th');
      let sort5_text = document.createTextNode('가격');
      sort5.appendChild(sort5_text);
      row.appendChild(sort5);
      head.appendChild(row);
      table.appendChild(head);
      for(let i = 0; i< parseData["items"].length; i++){
        let tr = document.createElement('tr');

        let imagetd = document.createElement('td');
        let image = document.createElement('img');
        let srcatt = document.createAttribute('src');
        srcatt.value = parseData["items"][i]["image"];
        image.setAttributeNode(srcatt);
        imagetd.appendChild(image);
        tr.appendChild(imagetd);


        let titletd = document.createElement('td');
        if(parseData["items"][i]["title"].indexOf("<b>")==-1){
          title = document.createTextNode(parseData["items"][i]["title"]);
          titletd.appendChild(title);
        }else{
          let bTag = document.createElement('b');
          let startIndex = parseData["items"][i]["title"].indexOf("<b>");
          let endIndex = parseData["items"][i]["title"].indexOf("</b>");
          let insidebTag = document.createTextNode(parseData["items"][i]["title"].slice(startIndex+3, endIndex));
          bTag.appendChild(insidebTag);
          let firstTextNode = document.createTextNode(parseData["items"][i]["title"].slice(0, startIndex));
          titletd.appendChild(firstTextNode);
          titletd.appendChild(bTag);
          let lastTextNode =document.createTextNode(parseData["items"][i]["title"].slice(endIndex+4));
          titletd.appendChild(lastTextNode);
        }

        tr.appendChild(titletd);

        let authortd = document.createElement('td');
        if(parseData["items"][i]["author"].indexOf("<b>")==-1){
          author = document.createTextNode(parseData["items"][i]["author"]);
          authortd.appendChild(author);

        }else{
          let bTag = document.createElement('b');
          let startIndex = parseData["items"][i]["author"].indexOf("<b>");
          let endIndex = parseData["items"][i]["author"].indexOf("</b>");
          let insidebTag = document.createTextNode(parseData["items"][i]["author"].slice(startIndex+3, endIndex));
          bTag.appendChild(insidebTag);
          let firstTextNode = document.createTextNode(parseData["items"][i]["author"].slice(0, startIndex));
          authortd.appendChild(firstTextNode);
          authortd.appendChild(bTag);
          let lastTextNode =document.createTextNode(parseData["items"][i]["author"].slice(endIndex+4));
          authortd.appendChild(lastTextNode);
        }
        tr.appendChild(authortd);

        let publishertd = document.createElement('td');


        if(parseData["items"][i]["publisher"].indexOf("<b>")==-1){
          publisher = document.createTextNode(parseData["items"][i]["publisher"]);
          publishertd.appendChild(publisher);
        }else{
          let bTag = document.createElement('b');
          let startIndex = parseData["items"][i]["publisher"].indexOf("<b>");
          let endIndex = parseData["items"][i]["publisher"].indexOf("</b>");
          let insidebTag = document.createTextNode(parseData["items"][i]["publisher"].slice(startIndex+3, endIndex));
          bTag.appendChild(insidebTag);
          let firstTextNode = document.createTextNode(parseData["items"][i]["publisher"].slice(0, startIndex));
          publishertd.appendChild(firstTextNode);
          publishertd.appendChild(bTag);
          let lastTextNode =document.createTextNode(parseData["items"][i]["publisher"].slice(endIndex+4));
          publishertd.appendChild(lastTextNode);
        }
        tr.appendChild(publishertd);

        let pricetd = document.createElement('td');
        let price = document.createTextNode(parseData["items"][i]["price"]);
        pricetd.appendChild(price);
        tr.appendChild(pricetd);
        table.appendChild(tr);
      }
    }
  };

  xhttp.open("POST", "searchBook.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let sendstr = "search="+input;
  xhttp.send(sendstr);
}
