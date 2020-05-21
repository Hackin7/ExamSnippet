var inArray = function(item,array){
	for (i in array){
		if (array[i] == item){return true;}
	}
	return false;
};
var haveEscapeCharacters = function(string){
	escapeCharacters = ["\r","\n"]
	return inArray(string.slice(-1),escapeCharacters);
}
var removeEscapeCharacters = function(string){
	if (haveEscapeCharacters(string)){
		return string.slice(0,-1);
	}
	return string;
}
var legacyToNew = function(Qn){
	if (Qn.tags == null){
		if (Qn.q_id != null)Qn.q_id = Qn.paper+" "+Qn.q_id;
		Qn.tags={
			"Type":[removeEscapeCharacters(Qn.type)],
			"Subject":[removeEscapeCharacters(Qn.subject)], 
			"Paper":[removeEscapeCharacters(Qn.paper)],
			"Topics":[]
		};
		if (Qn.topics != null){
			//console.log(Qn.topics);
			try{Qn.tags.Topics = Qn.topics.map(removeEscapeCharacters);}catch{}
		}
	}
	return Qn;
}

