angular.module('hopKongIonic')

.controller('BeersResultsCtrl', function ($scope, BeersResultsResource, $localStorage, $http) {
  console.log($localStorage.selectedGroups);

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

  // BarsResultsResource.query().$promise.then(function (response) {
  //   $scope.results = response;
  //   console.log(response);
  // });
  // use resource to obtain the data
});
// ['$scope', 'BeerResource', '$localStorage']