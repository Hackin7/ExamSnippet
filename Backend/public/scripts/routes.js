
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		template: "<h1>Hi</h1>"
	})
	.when("/start", {
		templateUrl : "finding/start.html"
	})
	.otherwise({
		template : "<h1>Hi</h1>"
	})});

