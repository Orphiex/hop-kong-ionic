angular.module('hopKongIonic')

.controller('HomeCtrl', ['$scope', '$auth', 'LoggedIn', '$cordovaBarcodeScanner', 'BarcodeResource', function($scope, $auth, $cordovaBarcodeScanner, BarcodeResource, LoggedIn){

  // passes data on login status
  $scope.loggedIn = LoggedIn;
  console.log($scope.loggedIn);

  $scope.scanBarcode = function(){
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      console.log(imageData);
      // BarcodeResource.get({barcode:imageData.text}).$promise.then(function(response){
      //   console.log(response);
      //   $scope.beer = response;
      // });
      // console.log(imageData.text);
      // console.log("Barcode Format -> " + imageData.format);
      // console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
      console.log("An error happened -> " + error);
    });
  };

  // $auth.validateUser({config: 'user'}).then(function(resp) {
  //   console.log(resp);
  //   LoggedIn.loggedIn = true;
  //   LoggedIn.userType = resp;
  //   console.log(LoggedIn);
  // }).catch(function(resp) {
  //   console.log(resp);
  //   $scope.loggedIn = false;
  // });
}]);
