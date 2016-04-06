angular.module('hopKongIonic')

.controller('BarsResultsCtrl', function ($scope, BarsResultsResource, $localStorage, $http, $auth, $cordovaGeolocation, DistanceCalc) {
  console.log($localStorage.selectedBarGroups);

  // $scope.list = [];
  var options = {timeout: 5000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    console.log('test');

    var userLat  = position.coords.latitude;
    var userLong = position.coords.longitude;

    $http({
      method: 'GET',
      // update for Heroku
      url: "http://localhost:3000/api/bars_results.json",
      paramSerializer: '$httpParamSerializerJQLike',
      params: $localStorage.selectedBarGroups
    }).then(function (resp) {
      console.log(resp);
      var distanceArray = resp.data.map(addDistance);
      $scope.vendors = distanceArray.sort(DistanceCalc.compare);
      //console.log($scope.list);
    }, function (resp) {
      //console.log(resp);
    });

    function addDistance(bar){
      if (bar.latitude === 0 && bar.longitude === 0){
        bar.distance = "Unknown";
      } else {
        bar.distance = DistanceCalc.calcDistance(userLat, userLong, bar.latitude, bar.longitude);
      }
      return bar;
    }

    // $scope.populateList = function(){
    //   for (var i = 0; i <= 9; i++) {
    //     if ($scope.vendors.length > 0){
    //       $scope.list.push($scope.vendors.splice(0,1));
    //     }
    //   }
    //   $scope.$broadcast('scroll.infiniteScrollComplete');
    // };

    // $scope.canWeLoadMoreContent = function() {
    //   return ($scope.vendors.length > 0) ? true : false;
    // };

    // $scope.populateList();

    // code below hides bookmark if user is authenticated
    $auth.validateUser().then(function(resp){
      $scope.user = resp;
      console.log("Logged In");
    }).catch(function(resp){
      $scope.user = null;
      console.log("Not Logged In");
    });
  });
});

// ['$scope', 'BeerResource', '$localStorage']