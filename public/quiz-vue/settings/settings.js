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
			savedata : JSON.stringify(this.questions),
			data:settings.data,
		}
	},
	methods : {
		loadData : function(){
			questions = JSON.parse(this.savedata);
			for (q in questions){questions[q] = legacyToNew(questions[q]);}
			alert("Save data Loaded");
		},
	}
})