angular.module('hopKongIonic')

.controller('VendorsCtrl', ['$scope', 'VendorResource', 'LoggedIn', function($scope, VendorResource, LoggedIn) {

  // passes data on login status
  $scope.loggedIn = LoggedIn;

  // Gets an index of all vendors
  VendorResource.query().$promise.then(function(response){
    $scope.vendors = response;
    console.log(response);
  });
}]);
