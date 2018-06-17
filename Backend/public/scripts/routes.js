app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "finding/method.html",
		controller: "finding"
	})
	.when("/finding/", {
		templateUrl : "finding/method.html",
		controller: "finding"
	})
	.when("/finding/question", {
		templateUrl : "finding/question.html",
		controller: "finding"
	})
	.when("/finding/random", {
		templateUrl : "finding/random.html",
		controller: "finding"
	})
	.when("/finding/random/listing", {
		templateUrl : "finding/random_listing.html",
		controller: "finding"
	})
	.when("/finding/json", {
		templateUrl : "finding/JSON.html",
		controller: "finding"
	})
	.when("/finding/listing", {
		templateUrl : "finding/listing.html",
		controller: "finding"
	})
	.when("/answering", {
		template : "<question></question><marking></marking><results></results><method></method>",
		controller: "answering"
	})
	.otherwise({
		template : "<h1>Page Not found</h1> {{test}}",
		controller: "answering"
	})});

