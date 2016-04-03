angular.module('hopKongIonic')

.controller('BeersResultsCtrl', function ($scope, BeersResultsResource, $localStorage, $http, $auth, LoggedIn) {
  console.log($localStorage.selectedGroups);

  $scope.loggedIn = LoggedIn;
  console.log($scope.loggedIn);

  $http({
    method: 'GET',
    // update for Heroku
    url: "http://localhost:3000/api/beers_results.json",
    paramSerializer: '$httpParamSerializerJQLike',
    params: $localStorage.selectedGroups
  }).then(function (resp) {
    console.log(resp);
    $scope.vendors = resp.data;
  }, function (resp) {
    console.log(resp);
  });

  // code below hides bookmark if user is authenticated
  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    console.log("Logged In");
  }).catch(function(resp){
    $scope.user = null;
    console.log("Not Logged In");
  });
});

// ['$scope', 'BeerResource', '$localStorage']