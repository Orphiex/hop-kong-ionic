angular.module('hopKongIonic')

.controller('BarsResultsCtrl', function ($scope, BarsResultsResource, $localStorage, $http) {
  console.log($localStorage.selectedGroups);

  $http({
    method: 'GET',
    url: "http://localhost:3000/api/bars_results.json", // previously had http://localhost:3000
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