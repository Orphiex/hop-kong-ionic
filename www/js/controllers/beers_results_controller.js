angular.module('hopKongIonic')

.controller('BeersResultsCtrl', ['$scope', 'BeerResource', '$localStorage', function($scope, BeerResource, $localStorage){
  console.log($localStorage.selectedGroups);
  // use resource to send the data
}]);