var loginPageHTML = `

<div class="content"><link rel="stylesheet" href="/login_system/static/style.css"></link>
<br>

<h3>Login</h3>
<div class="form-group">
	<label class="form-label">Username</label>
	<input placeholder="Enter Name" type="name" name=username class="form-control" value="" v-model="username">
</div>
<div class="form-group">
	<label class="form-label">Password</label>
	<input placeholder="Password" type="password" name=password class="form-control" value="" v-model="password">
</div>
	<button v-on:click="login()" class="btn btn-primary">Login</button>


<a href="/login_system/signup" class="btn btn-secondary">Sign Up</a>
</div>

`

var LoginSystemLogin = Vue.component('login-system-login', {
	template:loginPageHTML,
	data: function() {
		return {
			URL_PATH: "/login_system",
			username:"",
			password:""
		}
	},
	methods:{
		login: function(){
			var xhr = new XMLHttpRequest();
			xhr.open('POST', this.URL_PATH+'/api/login', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			//xhr.setRequestHeader("Set-Cookie",getCookie('user_sid'));
			xhr.onload = function () {
				// do something to response
				let data = JSON.parse(this.responseText);
				console.log(data);
				if (data.result == "Done"){
					//console.log(this);
					//document.cookie = "id";
					updateNavBarUser();
					window.location.hash = '#/main';
				}
				alert(data.result);
			};
			xhr.send('username='+this.username+'&password='+this.password);
			
		}
	}
});