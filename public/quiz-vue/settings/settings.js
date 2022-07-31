settingsHTML = `
<span>


<!-- https://itsolutionstuff.com/post/how-to-copy-to-clipboard-without-flash-in-angularjs-example.html-->

<div class="card" style="margin-bottom:80px">
<div class="card-header">Current Save Data.</div>
<div class="card-body">
<input id="savedata" v-model="savedata"/><!--{{questions}}-->
</div>
<div class="card-footer">
    
    <button class="btn btn-secondary" onclick="document.getElementById('savedata').select();document.execCommand('copy');">Copy to clipboard
    </button>
	
	<button class="btn btn-secondary" style="float:right;" v-on:click="sessionUpdate(session)">Save to Database</button>
	<button class="btn btn-secondary" style="float:right;" v-on:click="loadData()">Load</button>
</div>
</div>


<div class="card" style="margin-bottom:80px">
<div class="card-header">Question Data Source</div>
<div class="card-body">
    URL:<br>
    <textarea cols="75" v-model="data.url"/>
    Options:<br>
    <span v-for="source,name in data.sources">
        <input type="radio" v-model="data.url" v-bind:value="source"/>
        {{name}}<br>
    </span>
</div>

<!--<div class="card-footer">
    <button class="btn btn-secondary" style="float:right;" ng-click="data.refresh(data.url);">Refresh</button>
</div>-->
</div>

</span>
`;

var Settings = Vue.component('settings', {
	props: ['questions', 'session', 'sessionUpdate'],
	template:settingsHTML,
	data: function() {
		return {
			savedata : JSON.stringify(this.session),
			data:settings.data,
		}
	},
	methods : {
		loadData : function(){
			let data = JSON.parse(this.savedata);
			if (Array.isArray(data)){ //Legacy Code
				this.session.questions = data;
				for (q in this.session.questions){this.session.questions[q] = legacyToNew(this.session.questions[q]);}
				alert("Legacy save data loaded");
			}else{
				for (q in data.questions){data.questions[q] = legacyToNew(data.questions[q]);}
				for (property in data){
					this.session[property] = data[property];
				}
				alert("Save data Loaded");
			}
			
		},
	}
})