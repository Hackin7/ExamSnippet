answeringHTML = `
<div>

<link rel="stylesheet" type="text/css" href="answering/style.css">
<!--answering field-->
<div v-for="Q in questions">
<div class="card" style="margin-bottom:80px;" v-if="Q.step==1">

<div class="card-header">
	<b>Question {{Q.id+1}}: {{Q.q_id}}</b>
	<span style="float:right;">Show Resources <input v-model="showResources[Q.id]" type="checkbox" checked/></span>
</div>
<div class="card-body">
    <question-viewing v-bind:pdfs="Q.pdf" v-bind:images="Q.images"  v-if="gradingSystem.checkQuestionHasResources(Q)&&(showResources[Q.id]||showResources[Q.id]==undefined)"></question-viewing>
    <div v-bind:class="'question-answering '+ (!(gradingSystem.checkQuestionHasResources(Q)&&(showResources[Q.id]||showResources[Q.id]==undefined)) ? 'wide':'')" >
	
        <question-header v-bind:Q="Q" v-bind:marks="gradingSystem.questionScore(Q.marks)"></question-header>
		
		<br><b>Answering:</b><br>
        <!-- Input Types -->
        <div v-if="Q.tags.Type[0] == 'mcq'" v-for="(g,given) in Q.given" >
            <p><input v-bind:name="Q.id+'_'" type='radio' v-model="Q.answer[0]" v-bind:value="Q.given[given]"/>  {{Q.given[given]}}</p>
        </div>
        <!--<div v-if="Q.tags.Type[0] == 'blank'" v-for="(g,given) in Q.given">
            <input v-bind:name="Q.id+'_'+given" type='text' v-model="Q.answer[given]"/><br>
        </div>-->
        <div v-if="Q.tags.Type[0] != 'mcq'" v-for="(g,given) in Q.given">
			<textarea v-bind:name="Q.id+'_'+given" v-model="Q.answer[given]"/></textarea></div>
		
        <br><b>Working Area:</b><br>
		<textarea v-model="Q.workingArea"/></textarea><br>
		<whiteboard-general v-bind:data="Q.whiteboard" v-bind:noedit="false"></whiteboard-general>
		
		
	</div>
</div> 
   
<div class="card-footer">
    <button class="btn btn-secondary" style="float:right;" v-on:click="gradingSystem.marking(Q);window.console.log(Q);$forceUpdate();">Submit</button>
</div>

</div></div>


<!-- marking -->
<div v-for="Q in questions">
<div class="card" style="margin-bottom:80px" v-if="Q.step==2">
<div class="card-header">Marking {{Q.id+1}}</div>
<div class="card-body">
    <question-viewing v-bind:pdfs="Q.pdf" v-bind:images="Q.images"  v-if="gradingSystem.checkQuestionHasResources(Q)"></question-viewing>
	<div class="col"><question-header v-bind:Q="Q" v-bind:marks="gradingSystem.questionScore(Q.marks)"></question-header></div>
    <div v-if="!gradingSystem.checkQuestionHasResources(Q)"></div>
    
	<question-viewing v-bind:pdfs="Q.anspdf" v-bind:images="Q.answerimages"  v-if="gradingSystem.checkQuestionHasAnswerResources(Q)">
	<h3>Answers:</h3>
	</question-viewing>
    
    <div v-bind:class="(!gradingSystem.checkQuestionHasAnswerResources(Q) ? 'wide':'notwide')">
        <table class="table">
        <tr><th>Answer</th><th>Marking</th></tr>
        <tr><td>
                <p v-for="answer in Q.answer">{{answer}}</p>
        </td>
            <td>
                <span v-for="(c,correct) in Q.correct">
                    <input type="checkbox" v-model="Q.awarded[correct]" v-bind:value="Q.marks[correct]"/>
                    {{Q.correct[correct]}}  <b>[{{Q.marks[correct]}}]</b><br></span>
                Score: {{gradingSystem.scoring(Q.awarded, Q.marks)}}
            </td></tr>
        </table>
        Working Given: <p>{{Q.workingArea}}</p>
		<whiteboard-general v-bind:data="Q.whiteboard" v-bind:noedit="false"></whiteboard-general>
		<hr>
        Comments:<br>
        <textarea v-model="Q.markerComments"/></textarea><br>
    </div>
</div>
<div class="card-footer">
    <!--<input type="submit" class="btn btn-secondary" style="float:left;" value="Quit"/>-->
    <input type="submit" class="btn btn-secondary" style="float:right;" value="Submit" v-on:click="Q.step = Q.step + 1;$forceUpdate();"/>
    <input type="reset" class="btn btn-secondary" style="float:left;" value="Reset" v-on:click="Q.step=1;$forceUpdate();"/>
</div>
</div>
</div>

<!-- results -->
<div class="card" style="margin-bottom:80px" v-if="gradingSystem.checkMarkedComplete(questions)">
<div class="card-header">Results</div>
<div class="card-body">

    <div class="result">
        <h4><b>Total Score: {{gradingSystem.getTotalScoring(questions)}}</b></h4>
        <h5>Questions:</h5>
    </div>
	
    <table class="table result">
		<tr>
			<th>Question</th>
			<th>Answer</th>
			<th>Correct Answer</th>
			<th ><span class="hide-when-small">Comments</span></th>
		</tr>
			
		<tr v-for="Q in questions" >
			<td>
				<question-header v-bind:Q="Q" v-bind:marks="gradingSystem.questionScore(Q.marks)"></question-header>
				<br><br>
				<span  v-if="!gradingSystem.checkQuestionHasResources(Q)">No Resources</span>
				<resources-rundown v-bind:pdfs="Q.pdf" v-bind:images="Q.images"></resources-rundown>
			</td>
			
			<td>
				
				<ul>
					<li v-for="answer in Q.answer">
					<p>{{answer}}</p></li>
				</ul>
				<b>Working Given:</b> <p>{{Q.workingArea}}</p> 
				<whiteboard-general v-bind:data="Q.whiteboard" v-bind:noedit="true"></whiteboard-general>
			</td>
			
			
			
			<td><ul>
				<resources-rundown v-bind:pdfs="Q.anspdf" v-bind:images="Q.answerImages"></resources-rundown>
				<li v-for="(c,correct) in Q.correct" v-bind:style="gradingSystem.mistakeHighlighting(Q,correct)">
				{{Q.correct[correct]}}  <b>[{{Q.marks[correct]}}]</b></li>
			</ul>
			<span class='show-when-small'><b>Comments:</b><br>{{Q.markerComments}}</span>
			</td>
			
			<td >
				<span class="hide-when-small">{{Q.markerComments}}</span>
			</td>
		</tr>
	
    </table>
    
    <br/><br/>
	
 
</div>
<div class="card-footer">
	<input type="submit" class="btn btn-secondary" style="float:right;" value="Save to Database" v-on:click="sessionUpdate(session)"/>
    <input type="submit" class="btn btn-secondary" style="float:right;" value="Again" v-on:click="gradingSystem.process(questions);$forceUpdate();"/>
    <button class="btn btn-secondary" style="float:left;" v-on:click="questions=[];$forceUpdate();">Clear</button>
</div>
</div>

</div>
`;

//https://stackoverflow.com/questions/4853898/display-pdf-within-web-browser
//Use Google Drive embed https://stackoverflow.com/questions/14690000/how-to-embed-a-pdf
Vue.component('pdf-viewer', {
  props: ['pdfs'],
  template:
        `<span>
		<object type="application/pdf" v-if="pdfs != null" v-for="pdf in pdfs"
			v-bind:data="'http://docs.google.com/gview?embedded=true&url='+pdf">
        </object>
		
		<div v-for="(pdf,index) in pdfs"><a v-bind:href="'http://docs.google.com/gview?url='+pdf+'&embedded=true'" target="_blank" >PDF Link {{index+1}}</a></div>
		</span>
        `
});

Vue.component('question-header', {
  props: ['Q', 'marks'],
  data: function() {
		return {
			categoryPreviewLength: 4,
			tagPreviewLength: 1,
			expandTags:false,
		}
	},
  template:
        `<span>
			{{Q.q_id}}: {{Q.question}} <b>[{{marks}}]</b><br>
			<span><b>Tagged</b>:
					<span v-if="!expandTags" >
						<span style="margin-left: 0.25em;" v-for="tag in trimmedObjKeys(Q.tags,categoryPreviewLength)">
						{{tag}}: 
							<span data-toggle="tooltip" v-bind:title="Q.tags[tag][labelIndex]" disabled="" class="badge badge-secondary" 
							style="margin-left: 0.25em;" v-for="labelIndex in trimmedObjKeys(Q.tags[tag],tagPreviewLength)"><span>
								{{trimmedString(Q.tags[tag][labelIndex])}}
							</span></span>
						</span>
						...
					</span>
					
					<span data-toggle="tooltip" title="Show More"  class="badge badge-primary" 
						style="margin-left: 0.25em; cursor: pointer;" v-on:click="expandTags=!expandTags;"><span>
						{{!expandTags?'+':'-'}}
					</span></span>
					
					<span v-if="expandTags">
						<div style="margin-left: 0.25em;" v-for="tag in Object.keys(Q.tags)">
						{{tag}}: 
							<span data-toggle="tooltip" v-bind:title="label" disabled="" class="badge badge-secondary" 
							style="margin-left: 0.25em;" v-for="label in Q.tags[tag]"><span>
								{{label}}
							</span></span>
						</div>
					</span>
			</span>
		</span>`,
	methods : {
		trimmedObjKeys: function(obj,threshold){
			let keys = Object.keys(obj);
			if (keys.length > threshold){
				keys.splice(threshold, keys.length-threshold);
			}
			return keys;
		},
		trimmedString : function(string){
			let threshold = 11;
			if (string.length > threshold){
				return string.substring(0,threshold-3)+'...'
			}else{
				return string;
			}
		},
	}
});

Vue.component('question-viewing', {
	props: ['pdfs','images'],
	template: `
	<div class="question-viewing"> 
		<slot></slot>
        <pdf-viewer v-bind:pdfs="pdfs"></pdf-viewer>
        <a v-if="images != null" v-bind:href="image" target="_blank"  v-for="image in images"><img v-bind:src="image" alt="No related image of question here"/></a>
    </div> 
	`
});

Vue.component('resources-rundown', {
	props: ['pdfs','images'],
	template: `
	<div>
	<div v-if="pdfs != null" v-for="(pdf,index) in pdfs"><a v-bind:href="'http://docs.google.com/gview?url='+pdf+'&embedded=true'" target="_blank" >PDF Link {{index+1}}</a></div>
    <a v-if="images != null" v-bind:href="image" target="_blank"  v-for="image in images"><img v-bind:src="image" alt="No related image of question here"/></a>
	</div>
	`
});

Vue.component('whiteboard-general', {
	props: ['data','noedit'],
	template: `
	<span>
	 <br>
	 <hr>
	 <b>Whiteboard</b>
		<whiteboard-management style=""
			v-bind:whiteboard-data="data" wbwidth="335" wbheight="200" v-bind:noedit="noedit"></whiteboard-management>
			<br>
	</span>
	`
});
var Answering = Vue.component('answering', {
	props: ['questions', 'session', 'sessionUpdate'],
	template:answeringHTML,
	data: function() {
		return {
			gradingSystem:gradingSystem,window,Object,
			showResources:{},
		}
	},
	created: function(){
	}
})
