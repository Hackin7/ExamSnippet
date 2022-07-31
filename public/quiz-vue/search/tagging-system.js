taggingSystem = {};
taggingSystem.query="";
taggingSystem.tags = {}; //Selected Items Tree
taggingSystem.tagSelect = {};// {"Subject":{"hello":1}}; //Selected Items Tree

taggingSystem.found = {};// Index of found items
taggingSystem.selected = {};

// Tagging System //////////////////////////////////////
taggingSystem.updateTags = function(){
	allTags = {};
	itemIndex = taggingSystem.found;
	
	itemList = taggingSystem.itemsList;
	
	for (i in itemIndex){
		q = itemIndex[i];
		skipItem = false;
		itemTags = itemList[q].tags;
		for (cat in itemTags){ // category
			if (!allTags.hasOwnProperty(cat)){allTags[cat] = [];}
      //Adding tags//////////////////////////
			for (tag in itemTags[cat]){
				if (!allTags[cat].includes(itemTags[cat][tag]) ){
					allTags[cat].push(itemTags[cat][tag]);
					taggingSystem.tagSelectVarInitalisation(cat,tag);
				} 
			}
      ///////////////////////////////////////////
		}
	}
	taggingSystem.tags = allTags;
}
taggingSystem.tagSelectVarInitalisation = function(category, name){
  // Variable initialisation
  if (!taggingSystem.tagSelect.hasOwnProperty(category)){
    taggingSystem.tagSelect[category]={};
  }
  if (!taggingSystem.tagSelect[category].hasOwnProperty(name)){
    taggingSystem.tagSelect[category][name]=0;
  }
  //////////////////////////
}
taggingSystem.getTagSelect = function (category, name){
  taggingSystem.tagSelectVarInitalisation(category,name);
  return taggingSystem.tagSelect[category][name];
}
taggingSystem.setTagSelect = function (category, name, value){
  taggingSystem.tagSelectVarInitalisation(category,name);
  taggingSystem.tagSelect[category][name] = value;
}
// Get stuff //////////////////////////////////////////
taggingSystem.searchItems = function(){
	//Renaming
  let query = taggingSystem.query;
	let givenTags = taggingSystem.tagSelect;
  //Basic Initialisation of variables
  taggingSystem.found=[];
  
	for (q in taggingSystem.itemsList){
    //If substring cannot be found, ignore/////////////////////
		if (!JSON.stringify(taggingSystem.itemsList[q]).includes(query)){
			continue;
		}
    
		skipItem = false;
		itemTags = taggingSystem.itemsList[q].tags;
		//Item Checking//////////////////////////////////////////////
		for (cat in givenTags){
			//All tags
			for (tag in givenTags[cat]){
				if (givenTags[cat][tag] && 
            (!itemTags.hasOwnProperty(cat) || 
             (itemTags.hasOwnProperty(cat) && !itemTags[cat].includes(tag)) )
           ){
					//Skip This Item
					skipItem = true;
					break;
				}
			}
			if (skipItem){break;}
		}
    //Items////////////////////////////////
		if (!skipItem){
			taggingSystem.found.push(q);
		}
	}
}
taggingSystem.processing = function(){
  taggingSystem.searchItems();
  taggingSystem.updateTags();
}
// Selection ////////////////////////////////////
taggingSystem.selected = {};
taggingSystem.selectAll = function(){
	var selecting = false; //Deselecting
	var checking = function(value){return value};
	for (i in taggingSystem.found){
		if (taggingSystem.selected[taggingSystem.found[i]] != true){
			selecting = true; //Selecting
		}
	}
	for (i in taggingSystem.found){
		taggingSystem.selected[taggingSystem.found[i]] = selecting;
	}
};
taggingSystem.getSelected = function(){
  let items = [];
	for (i in taggingSystem.selected){
		if (taggingSystem.selected[i]){
			items.push(taggingSystem.itemsList[i]);
    }
	}
  return items;
}
// Random ///////////////////////////////////////
taggingSystem.randomQuantity = 1;
taggingSystem.randomSelect =  function(){
  n = taggingSystem.randomQuantity;
  taggingSystem.searchItems();

  //Deselect all
  for (i in taggingSystem.selected){
    taggingSystem.selected[i] = false;
  } 
  //Random Selection
  len = taggingSystem.found.length;
  if (n>=len){taggingSystem.selectAll();return;}
  //No questions
  for (var i=0;i<n;i++){
    var x = taggingSystem.found[Math.floor(Math.random() * len)];
    while (taggingSystem.selected[x]){var x = Math.floor(Math.random() * len);}
    taggingSystem.selected[x]=true;
  }
}
// Admin //////////////////////////////////////////
taggingSystem.start = function(){
	taggingSystem.query="";
	taggingSystem.tags = {}; 
	taggingSystem.tagSelect = {};
	taggingSystem.found = {};
	taggingSystem.selected = {};
	taggingSystem.processing();
}

taggingSystem.start();