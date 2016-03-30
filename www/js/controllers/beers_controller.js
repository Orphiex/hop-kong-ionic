angular.module('hopKongIonic').controller('BeersCtrl', function($scope, BeerReturn) {
  BeerReturn.query().$promise.then(function(response){
    $scope.beers = response;
  });
})