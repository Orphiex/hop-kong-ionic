angular.module('hopKongIonic')

.controller('BeersCtrl', ['$scope', 'BeerResource', function($scope, BeerResource) {
  BeerResource.query().$promise.then(function(response){
    $scope.beers = response;
    console.log(response);
  });

  $scope.selectedGroups = {
    country: [],
    style: [],
    location: [],
    brewery: [],
    vendor: [],
    beer: []
  };

  $scope.groups = {
    country: ['USA', 'Hong Kong'],
    style: ['IPA', 'Lager'],
    location: [],
    brewery: [],
    vendor: [],
    beer: []
  };

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };

  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.selectItem = function (name, item) {
    var itemIndex = $scope.selectedGroups[name].indexOf(item);
    itemIndex == -1 ? $scope.selectedGroups[name].push(item) : $scope.selectedGroups[name].splice(itemIndex, 1);
    console.log($scope.selectedGroups);
  };

  $scope.isItemSelected = function (name, item) {
    return $scope.selectedGroups[name].indexOf(item) != -1;
  };
}]);
