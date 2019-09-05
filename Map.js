// Initialize and add the map
function initMap() {
  let logoutButton = document.getElementById('logoutButton');
  let showLoginButton = document.getElementById('showLoginButton');
  if(sessionStorage.getItem('name')!=null){
    logoutButton.style.display ="block";
    showLoginButton.style.display = "none";
  }else{
    logoutButton.style.display ="none";
    showLoginButton.style.display = "block";
  }
  getLocation();
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



function showPosition(position) {

  /*
  var marker = new google.maps.Marker({
    title:'충남대학교 도서관',
    position: new google.maps.LatLng(36.370358, 127.346044),
    map: map
  });


  var marker = new google.maps.Marker({
    title:'온천마을 작은 도서관',
    position: new google.maps.LatLng(36.359843, 127.340819),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'유성 도서관',
    position: new google.maps.LatLng(36.378404, 127.375876),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'한빛 도서 문고',
    position: new google.maps.LatLng(36.364717, 127.355578),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'카이스트본원 중앙도서관',
    position: new google.maps.LatLng(36.369806, 127.362505),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'어은책마을 작은도서관',
    position: new google.maps.LatLng(36.361525, 127.355568),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'문학마을 작은도서관',
    position: new google.maps.LatLng(36.360920, 127.359319),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'영풍문고 유성점',
    position: new google.maps.LatLng(36.358743, 127.344122),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'우분투북스',
    position: new google.maps.LatLng(36.361790, 127.354120),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'서점이도저도',
    position: new google.maps.LatLng(36.388539, 127.348632),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'다모아서점',
    position: new google.maps.LatLng(36.362023, 127.366930),
    map: map
  });
  var marker =new google.maps.Marker({
    title:'꿈쟁이 작은도서관',
    position: new google.maps.LatLng(36.357787, 127.364830),
    map: map
  });
  var marker = new google.maps.Marker({
    title:'별똥별과학도서관',
    position: new google.maps.LatLng(36.369501, 127.335691),
    map: map
  });
  */
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 14,
           center: new google.maps.LatLng(position.coords.latitude,  position.coords.longitude),
           mapTypeId: 'roadmap'
    });
    let resultArray = this.responseText;
    let result = this.responseText.slice(17);
    let x = JSON.parse(result);
    for(let i = 0; i<x["places"].length;i++){
      var marker = new google.maps.Marker({
        title:x["places"][i]["name"],
        position: new google.maps.LatLng(x["places"][i]["y"], x["places"][i]["x"]),
        map: map
      });
    }
    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let resultArray = this.responseText;
      let result = this.responseText.slice(17);
      let x = JSON.parse(result);
      for(let i = 0; i<x["places"].length;i++){
        var marker = new google.maps.Marker({
          title:x["places"][i]["name"],
          position: new google.maps.LatLng(x["places"][i]["y"], x["places"][i]["x"]),
          map: map
        });
      }

    }
    };
    xhttp2.open("POST", "searchPlace.php", true);
    xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let sendstr2 = "lat="+position.coords.latitude+"&lon="+ position.coords.longitude+"&keyword=도서관";
    xhttp2.send(sendstr2);
  }
  };
  xhttp.open("POST", "searchPlace.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let sendstr = "lat="+position.coords.latitude+"&lon="+ position.coords.longitude+"&keyword=서점";
  xhttp.send(sendstr);



}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
