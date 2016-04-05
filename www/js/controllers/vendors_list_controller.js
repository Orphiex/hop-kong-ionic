angular.module('hopKongIonic')

.controller('VendorsListCtrl', ['$scope', '$http', '$stateParams', '$cordovaGeolocation', 'DistanceCalc', 'VendorsListResource', function($scope, $http, $stateParams, $cordovaGeolocation, DistanceCalc, VendorsListResource){

  var options = {timeout: 5000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var userLat  = position.coords.latitude;
    var userLong = position.coords.longitude;

    console.log($stateParams.beer);

    $http({
      method: 'GET',
      url: "http://localhost:3000/api/vendors_list.json",
      params: {beer_id: $stateParams.beer_id}
    }).then(function(resp){
      var distanceArray = resp.map(addDistance);
      $scope.vendors = distanceArray.sort(DistanceCalc.compare);
      console.log($scope.vendors);
      // $scope.vendors = resp.data;
    }, function(resp){
      console.log(resp);
    });

    // VendorsListResource.get({beer_id: $stateParams.beer_id}).$promise.then(function(resp){
    //   var distanceArray = resp.map(addDistance);
    //   $scope.vendors = distanceArray.sort(DistanceCalc.compare);
    //   console.log($scope.vendors);
    // });

    function addDistance(bar){
      bar.distance = DistanceCalc.calcDistance(userLat, userLong, bar.latitude, bar.longitude);
      return bar;
    }
  });
}]);
