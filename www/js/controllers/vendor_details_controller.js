angular.module('hopKongIonic')

.controller('VendorDetailsCtrl', ['$scope', 'VendorDetailsResource', '$localStorage', '$http', '$stateParams', function($scope, VendorDetailsResource, $localStorage, $http, $stateParams) {
  console.log($stateParams.vendor_id);
  VendorDetailsResource.get({id: $stateParams.vendor_id}).$promise.then(function(response){
    $scope.vendor = response;
    console.log(response);
  });
}]);