var URL_PATH = "/login_system";

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//console.log(document.cookie);
function getAccountData(eventHandler, noAccount, xhttpError){
	var cookieValue = getCookie('user_sid');
	if (cookieValue == "" ||cookieValue == null){
		noAccount();
		return;
	}
	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL_PATH+'/get/user_details', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader("Set-Cookie",cookieValue);
	xhr.onload = function () {
		// do something to response
		//console.log(this.responseText);
		let data = JSON.parse(this.responseText);
		if (data.error != null){
			if (xhttpError===null){
				alert("Error:\n"+data.error);
			}else{
				xhttpError();
			}
		}
		else{
			eventHandler(data);
		}
	};
	xhr.send('');
}

function applyToClassElements(className,apply){
	let elements = document.getElementsByClassName(className);
	for (let i in elements){
		try{
			apply(elements[i])
		}catch(err){}
	}
}

function showUserData(data){
	var userData = {};
	userData.user = data.user;
	applyToClassElements("login-system-name", (element)=>{element.innerHTML = userData.user.username;});
	applyToClassElements("login-system-loggedin-options", (element)=>{element.style.display = "inline";});
	applyToClassElements("login-system-loggedout-options", (element)=>{element.style.display = "none";});
}

function showNoAccount(){
	var userData = {};
	applyToClassElements("login-system-name", (element)=>{element.innerHTML = "Not Logged In";});
	applyToClassElements("login-system-loggedin-options", (element)=>{element.style.display = "none";});
	applyToClassElements("login-system-loggedout-options", (element)=>{element.style.display = "inline";});
}

function updateNavBarUser(){
	getAccountData(showUserData, showNoAccount, function(){});
}
updateNavBarUser();