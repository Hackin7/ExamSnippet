var loginSettingsHTML = `
<span>
<link rel="stylesheet" href="/login_system/static/style.css"></link>
	
<br>
<div class="content" >
<div>
	<h3>General User Settings</h3>
	<div class="">
		<label class="form-label">Given ID: {{id}}</label>
		<span id="id_field"></span>
	</div>
	<div class="form-group">
		<label class="form-label">Username</label>
		<input placeholder="Enter Name" type="name" name=username class="form-control" value="" v-model="username">
	</div>
	
	<button class="btn btn-primary" v-on:click="updateUserData()">Update</button>
</div>
<br>
<div>
	<h3>Change Password</h3>
	<div class="form-group">
		<label class="form-label">Enter Old Password</label>
		<input placeholder="Password" type="password" v-model="oldPassword" class="form-control" autocomplete=" " value="">
	</div>
	<div class="form-group">
		<label class="form-label">Enter New Password</label>
		<input placeholder="Password" type="password" v-model="newPassword" class="form-control" autocomplete=" " value="">
	</div>
	<button class="btn btn-primary" v-on:click="updatePassword()">Update</button>
</div><br>


<button class="btn btn-secondary" v-on:click="logout()">Logout</button>
<button class="btn btn-danger" v-on:click="deleteAccount()">Delete Account</button>
</div>
<br><br>
</span>
`;

var LoginSystemSettings = Vue.component('login-system-settings', {
	template:loginSettingsHTML,
	data: function() {
		return {
			URL_PATH: "/login_system",
			id:"",
			username:"",
			oldPassword: "",
			newPassword: "",
			
			actualname:""
		}
	},
	methods : {
		unpackData: function(data){
			this.id = data.user._id;
			this.username = data.user.username;
		},
		updateUserData: function(){
			var xhr = new XMLHttpRequest();
			xhr.open('POST', this.URL_PATH+'/update/user', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader("Set-Cookie",getCookie('user_sid'));
			xhr.onload = function () {
				// do something to response
				let data = JSON.parse(this.responseText);
				alert(data.result);
				updateNavBarUser();
			};
			xhr.send('username='+this.username);
		},
		updatePassword: function(){
			var xhr = new XMLHttpRequest();
			xhr.open('POST', this.URL_PATH+'/update/password', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader("Set-Cookie",getCookie('user_sid'));
			xhr.onload = function () {
				// do something to response
				let data = JSON.parse(this.responseText);
				alert(data.result);
			};
			xhr.send('oldPassword='+this.oldPassword+'&newPassword='+this.newPassword);
		},
		deleteAccount: function(){
			var logout = this.logout;
			if (confirm('Are you sure you want to delete your account? (The data lost is irreversible)') === false){
				return;
			}
			var xhr = new XMLHttpRequest();
			xhr.open('POST', this.URL_PATH+'/delete/user', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader("Set-Cookie",getCookie('user_sid'));
			xhr.onload = function () {
				// do something to response
				//console.log(this.responseText);
				let data = JSON.parse(this.responseText);
				alert(data.result);
				logout();
			};
			xhr.send('');
		},
		logout: function(){
			window.location.href = this.URL_PATH+"/logout";
		}
	},
	created: function() {
		getAccountData(this.unpackData, function(){window.location.href="/login"}, function(){});
	}
})