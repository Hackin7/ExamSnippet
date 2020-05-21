answeringHTML = `
<div>

<link rel="stylesheet" type="text/css" href="answering/style.css">

<!--answering field-->
<div v-for="Q in questions">
<div class="card" style="margin-bottom:80px;" v-if="Q.step==1">

<div class="card-header"><b>Question {{Q.id+1}}: {{Q.q_id}}</b></div>
<div class="card-body">
    <question-viewing v-bind:pdfs="Q.pdf" v-bind:images="Q.images"  v-if="gradingSystem.checkQuestionHasResources(Q)"></question-viewing>
    <div v-bind:class="'question-answering '+ (!gradingSystem.checkQuestionHasResources(Q) ? 'wide':'')" >
        <question-header v-bind:Q="Q" v-bind:marks="gradingSystem.questionScore(Q.marks)"></question-header>
        <!-- Input Types -->
        <div v-if="Q.tags.Type[0] == 'mcq'" v-for="(g,given) in Q.given" >
            <p><input v-bind:name="Q.id+'_'" type='radio' v-model="Q.answer[0]" v-bind:value="Q.given[given]"/>  {{Q.given[given]}}</p>
        </div>
        <div v-if="Q.tags.Type[0] == 'blank'" v-for="(g,given) in Q.given">
            <input v-bind:name="Q.id+'_'+given" type='text' v-model="Q.answer[given]"/><br>
        </div>
        <div v-if="Q.tags.Type[0] == 'open'" v-for="(g,given) in Q.given">
			<textarea v-bind:name="Q.id+'_'+given" v-model="Q.answer[given]"/></textarea></div>
		
        Working Area:<br>
        <textarea v-model="Q.workingArea"/></textarea><br>
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
    
    <div v-for="Q in questions" class="result">
    <question-header v-bind:Q="Q" v-bind:marks="gradingSystem.questionScore(Q.marks)"></question-header>
	
    <table class="table">
    <tr><th v-if="gradingSystem.checkQuestionHasResources(Q)">Images</th><th>Answer</th><th width="40%">Correct Answer</th></tr>
        <tr>
            <td width="20%" v-if="gradingSystem.checkQuestionHasResources(Q)">
					<resources-rundown v-bind:pdfs="Q.pdf" v-bind:images="Q.images"></resources-rundown>
            </td>
            <td><ul>
                <li v-for="answer in Q.answer">
                <p>{{answer}}</p></li>
            </ul></td>
            <td width="20%"  v-if="gradingSystem.checkQuestionHasAnswerResources(Q)">
                    <resources-rundown v-bind:pdfs="Q.anspdf" v-bind:images="Q.answerImages"></resources-rundown>
            </td>
            <td><ul>
                <li v-for="(c,correct) in Q.correct" v-bind:style="gradingSystem.mistakeHighlighting(Q,correct)">
                {{Q.correct[correct]}}  <b>[{{Q.marks[correct]}}]</b></li>
            </ul></td>
        </tr>
    </table>
    Working Given: <p>{{Q.workingArea}}</p> 
    Comments: <p>{{Q.markerComments}}</p>
    <br/><br/>
	
	</div>
 
</div>
<div class="card-footer">
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
        `<span><object v-if="pdfs != null" v-for="pdf in pdfs"
         v-bind:data="'http://docs.google.com/gview?url='+pdf+'&embedded=true'">
        </object>
		<div v-for="(pdf,index) in pdfs"><a v-bind:href="'http://docs.google.com/gview?url='+pdf+'&embedded=true'" target="_blank" >PDF Link {{index+1}}</a></div>
		</span>
        `
});

Vue.component('question-header', {
  props: ['Q', 'marks'],
  template:
        '<span>{{Q.q_id}}: {{Q.question}} <b>[{{marks}}]</b><br><span>Tagged: {{Q.tags}}</span></span>'
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



var Answering = Vue.component('answering', {
	props: ['questions'],
	template:answeringHTML,
	data: function() {
		return {
			gradingSystem:gradingSystem,window,
		}
	}
})
