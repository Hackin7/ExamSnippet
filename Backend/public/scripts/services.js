//https://howtodoinjava.com/angularjs/angularjs-http-restful-api-example/
app.service('restAPI', function($http) {
    this.subjects = function() {
		//RESTAPI Test
		return $http({method : 'GET',url : '/RESTAPI/list'})
		/*.then(function successCallback(response) {
			data = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
        return data*/
    }
    this.papers = function(subject) {
		return $http({method : 'GET',url : '/RESTAPI/list/'+subject})
	}
    this.questions = function(subject,paper) {
		return $http({method : 'GET',url : '/RESTAPI/list/'+subject+'/'+paper})
	}
    this.topics = function(subject) {
		return $http({method : 'GET',url : '/RESTAPI/topics/'+subject})
	}
    this.random = function(subject,type,topic,quantity) {
		return $http({method : 'GET',url : '/RESTAPI/random/'+subject+'/'+type+'/'+topic+'/'+String(quantity)})
	}
	/* POST random
	this.random = function(query) {
		var qWuery = {subject:"Test_Subject",type:"blank",topic:"None",quantity:2	};
		return $http({
					method : "POST",
					url : "/random",
					data : qWuery,
					headers : {'Content-Type' : 'application/json'}
				})
	}
	*/
});
