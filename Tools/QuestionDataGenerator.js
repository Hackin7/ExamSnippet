var inArray = function(item,array){
    for (i in array){
        if (array[i] == item){return true;}
    }
    return false;
};

//https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array?lq=1
//var item = items[Math.floor(Math.random()*items.length)];
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return arr//throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x]; //If thing already inside, replace with same thing
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

var haveEscapeCharacters = function(string){
    escapeCharacters = ["\r","\n"]
    return inArray(string.slice(-1),escapeCharacters)
}

//https://gist.github.com/kethinov/6658166
var fs = require('fs');
var loadQuestions = function(){
    var path = "../Questions/A Level/";
    /*fs.rmdir(path+'.*', (err) => {
      if (err) throw err;
      console.log('Questions/.DS_Store was deleted');
    });*/
    var subjects = fs.readdirSync(path);
    var questionTree = {};
    var topicsTree = {"Chemistry":["Periodic Table","Organic Chemistry"], "Test_Subject":["t1","t2","t3"]};//{};
    //console.log(subjects); //Debugging
    for (var i = 0; i < subjects.length; i++){ // Subjects
        console.log(subjects[i]); // Debugging
        questionTree[subjects[i]] = {};
        topicsTree[subjects[i]] = [];
        var papers = fs.readdirSync(path+subjects[i]+"/");
        for (j in papers){ // Papers
            //console.log(path+subjects[i]+"/"+papers[j]+"/index.json");
            var paperData = require(path+subjects[i]+"/"+papers[j]+"/index.json");
            questionTree[subjects[i]][paperData.paper] = paperData;
            //Remove escape characters
            if ( haveEscapeCharacters(questionTree[subjects[i]][paperData.paper].paper) ){
                        questionTree[subjects[i]][paperData.paper].paper = questionTree[subjects[i]][paperData.paper].paper.slice(0,-1);
            }
            //console.log( [subjects[i],papers[j],questionTree, topicsTree] );
            // Topics ///////////////////////////////////////////////
            for (k in paperData.questions){ // Topics
                for (l in paperData.questions[k].topics){
                    //Remove escape characters
                    if ( haveEscapeCharacters(paperData.questions[k].topics[l]) ){
                        paperData.questions[k].topics[l] = paperData.questions[k].topics[l].slice(0,-1);
                    }
                    if ( !inArray(paperData.questions[k].topics[l], topicsTree[subjects[i]]) ){
                        //console.log([i, paperData.questions[k].topics[l],subjects[i],topicsTree]);
                        topicsTree[subjects[i]].push(paperData.questions[k].topics[l]);
                    }
                    console.log([i,subjects[i],topicsTree[subjects[i]],paperData.questions[k].topics[l]],inArray(paperData.questions[k].topics[l], topicsTree[subjects[i]]));           
                }
            }/////////////////////////////////////////////////////
        }
        console.log(i);
    }
    return {subjects:subjects, questionTree:questionTree, topicsTree: topicsTree};
};

fs.writeFile("./QuestionData", JSON.stringify(loadQuestions().questionTree), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
