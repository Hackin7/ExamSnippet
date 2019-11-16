app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "finding/method.html"
    })
    .when("/finding", {
        templateUrl : "finding/method.html"//,
//      controller: "finding"
    })
    .when("/search", {
        templateUrl : "finding/search.html"
    })
    .when("/json", {
        templateUrl : "finding/JSON.html"
    })
    .when("/listing", {
        templateUrl : "finding/listing.html"
    })
    .when("/answering", {
        template : "<question></question><marking></marking><results></results>"
    })
    .otherwise({
        template : "<br><br><br><h1 style='text-align: center;'>Page Not found</h1> {{test}}"
    })
});

