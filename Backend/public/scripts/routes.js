app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "finding/method.html"
	})
	.when("/finding", {
		templateUrl : "finding/method.html"//,
//		controller: "finding"
	})
	.when("/finding/pick", {
		templateUrl : "finding/pick_subject.html"
	})
	.when("/finding/pick/subject", {
		templateUrl : "finding/pick_paper.html"
	})
	.when("/finding/pick/subject/paper", {
		templateUrl : "finding/pick_question.html"
	})
	.when("/finding/random", {
		templateUrl : "finding/random.html"
	})
	.when("/finding/random/listing", {
		templateUrl : "finding/random_listing.html"
	})
	.when("/finding/json", {
		templateUrl : "finding/JSON.html"
	})
	.when("/listing", {
		templateUrl : "finding/listing.html"
	})
	.when("/answering", {
		template : "<question></question><marking></marking><results></results>"
	})
	.otherwise({
		template : "<h1>Page Not found</h1> {{test}}"
	})
});

