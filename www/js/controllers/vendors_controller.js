angular.module('hopKongIonic')

.controller('VendorsCtrl', ['$scope', 'VendorResource', 'LoggedIn', function($scope, VendorResource, LoggedIn) {

  $scope.loggedIn = LoggedIn;

  VendorResource.query().$promise.then(function(response){
    $scope.vendors = response;
    console.log(response);
  });
}]);
