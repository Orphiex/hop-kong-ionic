angular.module('hopKongIonic')

.controller('BarsResultsCtrl', function ($scope, BarsResultsResource, $localStorage, $http, $auth, $cordovaGeolocation, DistanceCalc, VendorBkmkService) {

  console.log($localStorage.selectedBarGroups);

  // $scope.list = [];
  var options = {timeout: 15000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    console.log('test');

    var userLat  = position.coords.latitude;
    var userLong = position.coords.longitude;

    // code below hides bookmark if user is authenticated
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

    var getResults = function(){
      $http({
        method: 'GET',
        // update for Heroku
        url: "https://hop-kong-rails.herokuapp.com/api/bars_results.json",
        paramSerializer: '$httpParamSerializerJQLike',
        params: $localStorage.selectedBarGroups,
      }).then(function (resp) {
        console.log(resp);
        var distanceArray = resp.data.map(addDistance);
        $scope.vendors = distanceArray.sort(DistanceCalc.compare);
        //console.log($scope.list);
      }, function (resp) {
        console.log(resp);
      });
    };

    function addDistance(bar){
      if (bar.latitude === 0 && bar.longitude === 0){
        bar.distance = "Unknown";
      } else {
        bar.distance = DistanceCalc.calcDistance(userLat, userLong, bar.latitude, bar.longitude);
      }
      return bar;
    }

    // adds a bar bookmark
    $scope.addBookmark = function(bar_id){
      VendorBkmkService.addVendorBookmark($scope.user.id, bar_id).then(function(){
        getResults();
      });
    };

    // adds a bar bookmark
    $scope.deleteBookmark = function(bkmk_id){
      VendorBkmkService.removeVendorBookmark(bkmk_id).then(function(){
        getResults();
      });
    };

  }, function(error){
    console.log(error);
    console.log("Could not get location");
  });
});

// ['$scope', 'BeerResource', '$localStorage']