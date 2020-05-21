var inArray = function(item,array){
    for (i in array){
        if (array[i] == item){return true;}
    }
    return false;
};

//Dummy Data
givenTags = {"topic":["hi","not hi"]};//,
//    "subject":["hello singapore"]}
AllQuestions = [
{"tags":{"topic":["hi"],
    "subject":["hello singapore"]} },
{"tags":{"topic":["hi","not hi"]} },
{"tags":{"topic":["You are a failure"]} }
];
function getAllTags(){
    allTags = {}
    for (q in AllQuestions){
        SkipQuestion = false;
        questionTags = AllQuestions[q].tags;
        for (cat in questionTags){
            if (allTags[cat] == undefined){
                allTags[cat] = [];
            }
            for (tag in questionTags[cat]){
                if (!inArray(questionTags[cat][tag],allTags[cat]) ){
                    allTags[cat].push(questionTags[cat][tag])
                } 
            }
        }
    }
    return allTags;
}
function selectQuestions(givenTags){
    meetCondition = [];
    for (q in AllQuestions){
        SkipQuestion = false;
        questionTags = AllQuestions[q].tags;
        //Categories
        for (cat in givenTags){
            //All tags
            for (tag in givenTags[cat]){
                if (!inArray(givenTags[cat][tag],questionTags[cat]) ){
                    //Skip This Question
                    SkipQuestion = true;
                    break;
                }
            }
            if (SkipQuestion){break;}
        }
        if (!SkipQuestion){
            meetCondition.push(q);
        }
    }
    return meetCondition;
}
console.log(selectQuestions(givenTags));
console.log(getAllTags())
