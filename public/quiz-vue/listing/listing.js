var listingHTML = `
<div class="card" style="margin-top:80px">
<div class="card-header">Questions</div>
<div class="card-body">

<div class="alert alert-secondary alert-dismissible fade show" role="alert" v-for="qns,Q in questions">
  <question-header v-bind:Q="questions[Q]" v-bind:marks="gradingSystem.questionScore(questions[Q].marks)"></question-header>
  <button class="btn btn-secondary" v-on:click="questions[Q].step=1;">Reset</button>
  <button type="button" class="close" v-on:click="questions.splice(Q,1);" aria-label="Close">
  <!--https://www.w3schools.com/js/js_array_methods.asp-->
    <span aria-hidden="true" >&times;</span>
  </button>
</div>

</div>
<div class="card-footer">
    <a href="#\!" class="btn btn-secondary" style="float:left;">Add More</a>
    <a href="#!answering" role="button" class="btn btn-secondary" style="float:right;" v-on:click="start();">Start</a>
    <button class="btn btn-secondary" style="float:right;" v-on:click="questions.splice(0,length(questions).slice(-1)+1);">Clear</button>
</div>
</div>
`;

var Listing = Vue.component('listing', {
	template:listingHTML,
	data: function() {
		return {
			questions,
			gradingSystem
		}
	},
	methods:{
		start : function(){
			gradingSystem.process(questions);
			window.location.href = "#/answering";
		}
	}
})