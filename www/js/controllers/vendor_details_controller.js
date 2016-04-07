angular.module('hopKongIonic')

.controller('VendorDetailsCtrl', ['$scope', 'VendorDetailsResource', '$localStorage', '$http', '$stateParams', '$window', '$auth', 'VendorBkmkService', function($scope, VendorDetailsResource, $localStorage, $http, $stateParams, $window, $auth, VendorBkmkService) {

  console.log($stateParams.vendor_id);


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
    VendorDetailsResource.get({id: $stateParams.vendor_id}).$promise.then(function(response){
      $scope.vendor = response;
      console.log(response);
    });
  }

  // adds a bar bookmark
  $scope.addBookmark = function(bar_id){
    VendorBkmkService.addBarBookmark($scope.user.id, bar_id).then(function(){
      getResults();
    });
  };

  // adds a bar bookmark
  $scope.deleteBookmark = function(bkmk_id){
    VendorBkmkService.removeBarBookmark(bkmk_id).then(function(){
      getResults();
    });
  };


}]);