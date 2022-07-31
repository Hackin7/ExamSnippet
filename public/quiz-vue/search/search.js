var searchHTML = `

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
    <h4>Questions <h5 style="float:right;display: inline;">{{taggingSystem.found.length}} found</h5></h4>
        <div class="list-group checked-list-box search-scrollable-group">
      <li class="list-group-item" v-for="Q in taggingSystem.found">
		<input type="checkbox" v-model="taggingSystem.selected[Q]"/>
		<question-header v-bind:Q="taggingSystem.itemsList[Q]" v-bind:marks="gradingSystem.questionScore(taggingSystem.itemsList[Q].marks)"></question-header>
		</li>
     </div>
</div>

<div class="search-ok">
    <br><br>
    <button role="button" class="btn btn-secondary" style="float:left;" v-on:click="taggingSystem.selectAll();$forceUpdate();">Select All</button>
    <a href="#\listing" role="button" class="btn btn-secondary" style="float:right;" v-on:click="addQuestions();">OK</a>
	<br><br><br>
</div>

</div>
`;

var Search = Vue.component('search', {
	props: ['session'],
	template:searchHTML,
	data: function() {
		return {
			window,taggingSystem,gradingSystem,
		}
	},
	methods : {
		retrieve : function(data){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				 if (xhttp.readyState == 4 && xhttp.status == 200) {
					let data = JSON.parse(xhttp.responseText);
					if (Array.isArray(data)){
						taggingSystem.itemsList = data;//[];
					}else{
						taggingSystem.itemsList = [];
						// Unpacking tree //////////////////////////////
						for (subject in data){
							for (paper in data[subject]){
								var paperData = data[subject][paper];
								for (k in paperData.questions){ // Topics
									//Legacy support
									let Qn = legacyToNew(paperData.questions[k]);
									//console.log(Qn);
									taggingSystem.itemsList.push(Qn);
								}
							}
						}
						////////////////////////////////////////
					}
					taggingSystem.start();
				 }
			};
			xhttp.open("GET", settings.data.url, true);
			xhttp.setRequestHeader("Content-type","application/json");
			xhttp.send();
			return xhttp;
		},
		refresh: function(){
			taggingSystem.searchItems();taggingSystem.updateTags();
			this.$forceUpdate();
		},
		addQuestions : function(){
			let newQuestions = taggingSystem.getSelected();
			console.log(newQuestions);
			this.session.questions = this.session.questions.concat(newQuestions);
			window.location.href = "#/listing";
		}
	},
	created: function() {
		console.log("Retrieving data");
		this.retrieve();
	}
})