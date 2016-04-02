angular.module('hopKongIonic')

.controller('AllBarsCtrl', ['$scope', /*'$http',*/ '$localStorage', '$cordovaGeolocation', 'LoggedIn', 'AllBarsResource', function($scope, /*$http,*/ $localStorage, $cordovaGeolocation, LoggedIn, AllBarsResource){

  // $http({
  //   method: 'GET',
  //   url: "http://localhost:3000/api/all_bars.json",
  //   paramSerializer: '$httpParamSerializerJQLike',
  //   params: $localStorage.selectedGroups
  // }).then(function (resp) {
  //   console.log(resp.data);
  //   $scope.results = resp.data;
  // }, function (resp) {
  //   console.log(resp);
  // });

  var options = {timeout: 10000, enableHighAccuracy: true};

  var userLat;
  var userLong;

  $scope.results = [];

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    userLat = position.coords.latitude;
    userLong = position.coords.longitude;

    AllBarsResource.query().$promise.then(function(resp){
      console.log(resp);
      var distanceArray = resp.map(addDistance);
      $scope.results = distanceArray.sort(compare);
    });
  });

  function addDistance(bar){
    // console.log(bar);
    bar.distance = calcDistance(userLat, userLong, bar.latitude, bar.longitude);
    return bar;
    // console.log(bar);
  }

  function compare(a,b){
    if (a.distance < b.distance)
      return -1;
    else if (a.distance > b.distance)
      return 1;
    else
      return 0;
  }

  function calcDistance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist;
  }

}]);
