angular.module('hopKongIonic')

.controller('BeersResultsCtrl', function ($scope, BeersResultsResource, $localStorage) {
  console.log($localStorage.selectedGroups);
  BeersResultsResource.query().$promise.then(function (response) {
    $scope.results = response;
  });
  // use resource to obtain the data
});

// ['$scope', 'BeerResource', '$localStorage']