angular.module('hopKongIonic')

.controller('VendorDetailsCtrl', ['$scope', 'VendorDetailsResource', '$localStorage', '$http', '$stateParams', '$window', '$auth', 'VendorBkmkService', function($scope, VendorDetailsResource, $localStorage, $http, $stateParams, $window, $auth, VendorBkmkService) {
  // opens up social media icons in different window
  $scope.toBrowser = function (link) {
    $window.open(encodeURI(link), '_system');
  };

  // hides bookmark if user authenticated
  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    $scope.loggedIn = resp.signedIn;
    console.log("Logged In");
    getResults();
  }).catch(function(resp){
    $scope.user = {id: 0};
    $scope.loggedIn = false;
    console.log("Not Logged In");
    getResults();
  });

  function getResults(){
    VendorDetailsResource.get({id: $stateParams.vendor_id, user_id: $scope.user.id}).$promise.then(function(response){
      $scope.vendor = response;
      console.log(response);
    });
  }

  $scope.addBookmark = function(vendor_id){
    VendorBkmkService.addVendorBookmark($scope.user.id, vendor_id).then(function(){
      getResults();
    });
  };

  $scope.deleteBookmark = function(bkmk_id){
    VendorBkmkService.removeVendorBookmark(bkmk_id).then(function(){
      getResults();
    });
  };


}]);