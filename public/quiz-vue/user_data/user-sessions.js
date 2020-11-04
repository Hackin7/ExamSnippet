var userSessionsHTML = `
<span>
<div class="search-container">
<link rel="stylesheet" type="text/css" href="search/style.css">


<div class="search-header">
    <h4 style="white-space:pre-wrap;display: inline;">Search:   </h4>
    <input name='search-field' id="search-field" type='text' v-model="taggingSystem.query"  v-on:keyup="refresh();"/>
    <hr/>
</div>
<div class="search-menu">
    <h4>Filters</h4>
    <div class="search-scrollable-group">
        <div v-for="t, tag in taggingSystem.tags">
            <b>{{tag}}</b><br/>
            <span v-for="name in taggingSystem.tags[tag]">
                <input type='checkbox' v-on:change="refresh();"
                v-model="taggingSystem.tagSelect[tag][name]"/>  {{name}}<br>
            </span>
        </div>
    </div>
</div>
<div class="search-random">
    <hr/>
    <h4>Random Selection</h4>
    <span style="display:inline;white-space:pre-wrap;">Amount  </span>
    <input type="number" name="Amount" min="1" v-model="taggingSystem.randomQuantity">
    <br><br>
    <button role="button" class="btn btn-secondary" style="float:left;" v-on:click="taggingSystem.randomSelect();window.alert('Random selection done');">Random Select</button>
    <br><br>
</div>

<div class="search-main">
    <h4>Sessions <h5 style="float:right;display: inline;">{{taggingSystem.found.length}} found</h5></h4>
      <div class="list-group checked-list-box search-scrollable-group">
		<li class="list-group-item" v-for="Q in taggingSystem.found">
			<input type="checkbox" name="session-choice" v-model="taggingSystem.selected[Q]"/>
			<span v-on:click="rename(Q);" title="Click to rename" style="cursor: pointer;"><b>Name: </b><span >{{taggingSystem.itemsList[Q].name}},</span></span>
			<b>SessionDate:</b> {{taggingSystem.itemsList[Q].startDate}}<br
			 
			<ul>
			<span><b>Questions(s)</b>: {{taggingSystem.itemsList[Q].questions.length}} </span> 
			<span data-toggle="tooltip" title="Show More"  class="badge badge-primary" 
				style="margin-left: 0.25em; cursor: pointer;" v-on:click="toggleQuestions(Q);"><span>
				{{!showQuestionsInSessions[Q]?'+':'-'}}
			</span></span>
			
				<li v-if="showQuestionsInSessions[Q]" v-for="qns in taggingSystem.itemsList[Q].questions">
					<question-header v-bind:Q="qns"
									v-bind:marks="gradingSystem.questionScore(qns.marks)">
					</question-header>
				</li>
			</ul>
			<!--<b>tags</b>{{taggingSystem.itemsList[Q].tags}}-->
			
		</li>
     </div>
</div>

<div class="search-ok">
    <br>
    <button role="button" class="btn btn-secondary" style="float:left;" v-on:click="taggingSystem.selectAll();$forceUpdate();">Select All</button>
    <button  role="button" class="btn btn-secondary" style="float:right;" v-on:click="useSelected();">OK</button>
	<button  role="button" class="btn btn-secondary" style="float:left;" v-on:click="deleteSelected();">Delete</button>
	<br><br>
</div>

</div>
</span>
`;

var userSessionsData = Vue.component('user-sessions', {
	template:userSessionsHTML,
	data: function() {
		return {
			window,taggingSystem,gradingSystem,
			showQuestionsInSessions: {},
		}
	},
	methods : {
		rename: function(Q){
			var newName = prompt("Enter new name:");
			//alert(newName);
			if (newName !== null){
				this.taggingSystem.itemsList[Q].name = newName;
				sessionUpdate(this.taggingSystem.itemsList[Q]);
				this.$forceUpdate();
			}
			//console.log(this.taggingSystem.itemsList[Q])
		},
		toggleQuestions: function(Q){
			//console.log(Q);
			if (this.showQuestionsInSessions[Q]==null){
				Vue.set(this.showQuestionsInSessions, Q, true);
			}else{
				Vue.set(this.showQuestionsInSessions, Q, !this.showQuestionsInSessions[Q]);
			}
			console.log(this.showQuestionsInSessions);
		},
		processing: function(itemsList){
			for (var i in itemsList){
				//if (true){
				if (itemsList[i].tags == null){
					var res = itemsList[i].startDate.split(" ");
					var date = res[0].split("-"), time=res[1].split(":");
					var year = date[0], month = date[1], day = date[2];
					itemsList[i].tags = {"Year":[year], "Month":[month], "Day":[day]};
				}
			}
			return itemsList;
		},
		retrieve : function(data){
			var processing = this.processing;
			var xhr = new XMLHttpRequest();
			xhr.open('POST','/user_data/api/get_sessions', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader("Set-Cookie",getCookie('user_sid'));
			xhr.onload = function () {
				let data = JSON.parse(this.responseText);
				console.log(data)
				if (data.error != null){alert("Error:\n"+data.error);}
				else{
					taggingSystem.itemsList = processing(data.user.sessions);;
					taggingSystem.start();
				}
			};
			xhr.send('');
			return xhr;
		},
		refresh: function(){
			taggingSystem.searchItems();taggingSystem.updateTags();
			this.$forceUpdate();
		},
		deleteSelected: function(){
			let selectedSessions = taggingSystem.getSelected();
			let selectedLength = selectedSessions.length;
			if (selectedLength===0){alert("You selected no sessions!");return;}
			
			if(confirm('Are you sure you want to delete the selected '+selectedLength+' sessions? (The data lost is irreversible)') === false){return;}
			let datesToDelete = [];
			for (var index in selectedSessions){
				datesToDelete.push(selectedSessions[index].startDate);
			}
			/// Server Call ///////////////////////////////////////////////////////////
			var refreshing = this.retrieve;
			var xhr = new XMLHttpRequest();
			xhr.open('POST','/user_data/api/sessions/remove/many', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader("Set-Cookie",getCookie('user_sid'));
			xhr.onload = function () {
				let data = JSON.parse(this.responseText);
				console.log(data)
				if (data.error != null){alert("Error:\n"+data.error);}
				else{
					refreshing();
				}
			};
			xhr.send(JSON.stringify({startDates:datesToDelete}));
			return xhr;
		},
		useSelected: function(){
			let newSessions = taggingSystem.getSelected();
			console.log(JSON.stringify(newSessions))
			if (newSessions.length !== 1){
				//alert("You can only select 1 session at a time. You currently selected "+newSessions.length+" sessions.")
				if (confirm("Combine "+newSessions.length+" sessions for viewing?")){
					// Concatenation of all things
					session.name = "Combination of sessions";
					session.questions = [];
					for (var curr in newSessions){
						session.questions = session.questions.concat(newSessions[curr].questions);
					}
					window.location.href = "#/answering";
				}else{
					return;
				}
			}else{
				session = newSessions[0];
				//console.log(newQuestions);
				//questions = questions.concat(newQuestions);
				window.location.href = "#/answering";
			}
		}
	},
	created: function() {
		console.log("Retrieving data");
		this.retrieve();
	}
})