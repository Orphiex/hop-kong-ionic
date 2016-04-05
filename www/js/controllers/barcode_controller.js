angular.module('hopKongIonic')

.controller('BarcodeCtrl', ['$scope', '$cordovaBarcodeScanner', 'BarcodeResource', function($scope, $cordovaBarcodeScanner, BarcodeResource){

  $scope.scanBarcode = function(){
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      console.log(imageData);
      BarcodeResource.get({barcode:imageData.text}).$promise.then(function(response){
        console.log(response);
        $scope.beer = response;
      });
      // console.log(imageData.text);
      // console.log("Barcode Format -> " + imageData.format);
      // console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
      console.log("An error happened -> " + error);
    });
  };

}]);
