angular.module('hopKongIonic')

.controller('BeersCtrl', ['$scope', 'BeerResource', function($scope, BeerResource) {
  BeerResource.query().$promise.then(function(response){
    $scope.beers = response;
    console.log(response);
  });
}]);
