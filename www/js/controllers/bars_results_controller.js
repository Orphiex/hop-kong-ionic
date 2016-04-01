angular.module('hopKongIonic')

.controller('BarsResultsCtrl', function ($scope, BarsResultsResource, $localStorage, $http) {
  console.log($localStorage.selectedGroups);

  $http({
    method: 'GET',
    // update for Heroku
    url: "http://localhost:3000/api/bars_results.json",
    paramSerializer: '$httpParamSerializerJQLike',
    params: $localStorage.selectedGroups
  }).then(function (resp) {
    console.log(resp);
    $scope.vendors = resp.data;
  }, function (resp) {
    console.log(resp);
  });
});

// ['$scope', 'BeerResource', '$localStorage']