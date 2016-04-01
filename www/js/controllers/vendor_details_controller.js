angular.module('hopKongIonic')

.controller('VendorDetailsCtrl', ['$scope', 'VendorDetailsResource', '$localStorage', '$http', '$stateParams', '$window', function($scope, VendorDetailsResource, $localStorage, $http, $stateParams, $window) {
  console.log($stateParams.vendor_id);
  VendorDetailsResource.get({id: $stateParams.vendor_id}).$promise.then(function(response){
    $scope.vendor = response;
    console.log(response);
  });

  $scope.toBrowser = function (link) {
    $window.open(encodeURI(link), '_system');
  };
}]);