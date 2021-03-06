angular.module('hopKongIonic')

.controller('VendorsListCtrl', ['$scope', '$http', '$auth', '$stateParams', '$cordovaGeolocation', 'DistanceCalc', 'VendorsListResource', 'VendorDetailsResource', function($scope, $http, $auth, $stateParams, $cordovaGeolocation, DistanceCalc, VendorsListResource, VendorDetailsResource){

  var options = {timeout: 15000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var userLat  = position.coords.latitude;
    var userLong = position.coords.longitude;

    $http({
      method: 'GET',
      url: "https://hop-kong-rails.herokuapp.com/api/vendors_list.json",
      params: {beer_id: $stateParams.beer_id}
    }).then(function(resp){
      var distanceArray = resp.data.map(addDistance);
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
      if (bar.latitude === 0 && bar.longitude === 0){
        bar.distance = "Unknown";
      } else {
        bar.distance = DistanceCalc.calcDistance(userLat, userLong, bar.latitude, bar.longitude);
      }
      return bar;
    }
  });

  // hides bookmark if user authenticated
  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    $scope.loggedIn = resp.signedIn;
    console.log("Logged In");
  }).catch(function(resp){
    $scope.user = {id: 0};
    $scope.loggedIn = false;
    console.log("Not Logged In");
  });
}]);
