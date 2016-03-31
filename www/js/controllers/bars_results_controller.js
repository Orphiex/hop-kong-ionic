angular.module('hopKongIonic')

.controller('BarsResultsCtrl', function ($scope, BarsResultsResource, $localStorage) {
  console.log($localStorage.selectedGroups);
  BarsResultsResource.query().$promise.then(function (response) {
    $scope.results = response;
  });
  // use resource to obtain the data
});

// ['$scope', 'BeerResource', '$localStorage']