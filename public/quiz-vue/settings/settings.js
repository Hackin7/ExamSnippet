settingsHTML = `
<span>


<!-- https://itsolutionstuff.com/post/how-to-copy-to-clipboard-without-flash-in-angularjs-example.html-->
<div class="card" style="margin-button:80px">
<div class="card-header">Current Save Data.</div>
<div class="card-body">
<input id="savedata" v-model="savedata"/><!--{{questions}}-->
</div>
<div class="card-footer">
    <!--<input type="button" class="btn btn-secondary" style="float:right;" ng-click="" value="Download"/>-->
    <button class="btn btn-secondary" onclick="document.getElementById('savedata').select();document.execCommand('copy');">Copy to clipboard
    </button>
	
	<a href="#!answering" role="button" class="btn btn-secondary" style="float:right;" v-on:click="loadData()">Load</a>
</div>
</div>

<!--
<div class="card" style="margin-top:80px">
<div class="card-header">Question Data Source</div>
<div class="card-body">
    URL:<br>
    <textarea  cols="75" ng-model="data.url"/>
    Options:<br>
    <span  ng-repeat="source in data.sourcesnames" >
        <input type="radio"ng-model="data.url" value="{{data.sources[source]}}"/>
        {{source}}<br>
    </span>
</div>

<div class="card-footer">
    <button class="btn btn-secondary" style="float:right;" ng-click="data.refresh(data.url);">Refresh</button>
</div>
</div>
-->

</span>
`;

var Settings = Vue.component('settings', {
	props: ['questions'],
	template:settingsHTML,
	data: function() {
		return {
			savedata : JSON.stringify(this.questions),
			window : window
		}
	},
	methods : {
		loadData : function(){
			questions = legaryToNew(JSON.parse(this.savedata));
			
			alert("Savedata Loaded");
		}
	}
})