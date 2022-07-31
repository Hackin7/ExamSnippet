var userQuestionsHTML = `

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
    <h4>Questions</h4>
        <div class="list-group checked-list-box search-scrollable-group">
      <li class="list-group-item" v-for="Q in taggingSystem.found">
		<input type="checkbox" v-model="taggingSystem.selected[Q]"/>
		<question-header v-bind:Q="taggingSystem.itemsList[Q]" v-bind:marks="gradingSystem.questionScore(taggingSystem.itemsList[Q].marks)"></question-header>
		</li>
     </div>
</div>

<div class="search-ok">
    <br>
    <button role="button" class="btn btn-secondary" style="float:left;" v-on:click="taggingSystem.selectAll();">Select All</button>
    <a href="#\listing" role="button" class="btn btn-secondary" style="float:right;" v-on:click="addQuestions();">OK</a>
</div>

</div>
`;

function getQuestionData(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST','/user_data/api/get_question_data', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader("Set-Cookie",getCookie('user_sid'));
	xhr.onload = function () {
		let data = JSON.parse(this.responseText);
		if (data.error != null){alert("Error:\n"+data.error);}
		else{
			userData.user = data.user;
			showUserData();
		}
	};
	xhr.send('');
}
var userQuestionData = Vue.component('user-questions', {
	template:searchHTML,
	data: function() {
		return {
			window,taggingSystem,gradingSystem,
		}
	},
	methods : {
		retrieve : function(data){
			var xhr = new XMLHttpRequest();
			xhr.open('POST','/user_data/api/get_question_data', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader("Set-Cookie",getCookie('user_sid'));
			xhr.onload = function () {
				let data = JSON.parse(this.responseText);
				console.log(data)
				if (data.error != null){alert("Error:\n"+data.error);}
				else{
					taggingSystem.itemsList = data.user.questions;
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
		addQuestions : function(){
			let newQuestions = taggingSystem.getSelected();
			console.log(newQuestions);
			questions = questions.concat(newQuestions);
			window.location.href = "#/listing";
		}
	},
	created: function() {
		console.log("Retrieving data");
		this.retrieve();
	}
})