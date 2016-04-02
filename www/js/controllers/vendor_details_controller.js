angular.module('hopKongIonic')

.controller('VendorDetailsCtrl', ['$scope', 'VendorDetailsResource', '$localStorage', '$http', '$stateParams', '$window', '$auth', function($scope, VendorDetailsResource, $localStorage, $http, $stateParams, $window, $auth) {
  console.log($stateParams.vendor_id);
  VendorDetailsResource.get({id: $stateParams.vendor_id}).$promise.then(function(response){
    $scope.vendor = response;
    console.log(response);
  });

  $scope.toBrowser = function (link) {
    $window.open(encodeURI(link), '_system');
  };

  // code below hides bookmark if user is authenticated
  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    console.log("Logged In");
  }).catch(function(resp){
    $scope.user = null;
    console.log("Not Logged In");
  });
}]);