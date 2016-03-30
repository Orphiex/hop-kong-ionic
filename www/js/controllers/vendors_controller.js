angular.module('hopKongIonic')

.controller('VendorsCtrl', ['$scope', 'VendorResource', function($scope, VendorResource) {
  VendorResource.query().$promise.then(function(response){
    $scope.vendors = response;
    console.log(response);
  });
}]);
