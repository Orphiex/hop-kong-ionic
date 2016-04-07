angular.module('hopKongIonic')

.controller('MapCtrl', ['$scope', /*'$state',*/ '$localStorage', '$cordovaGeolocation', 'LoggedIn', 'AllBarsResource', 'DistanceCalc', function($scope, /*$state,*/ $localStorage, $cordovaGeolocation, LoggedIn, AllBarsResource, DistanceCalc) {

  console.log("test");

  // Adds a time delay
  var options = {timeout: 15000, enableHighAccuracy: true};

  $scope.vendors = [];

  // Runs the geolocation package that gets the user's current location
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var userLat  = position.coords.latitude;
    var userLong = position.coords.longitude;

    var userLocation = new google.maps.LatLng(userLat, userLong);

    console.log(userLocation);

    // Sets initial map values
    var mapOptions = {
      center: userLocation,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // var bounds  = new google.maps.LatLngBounds();

    // Gets bar data using the factory in services.js, then applies the distance and returns a sorted array.
    AllBarsResource.query().$promise.then(function(resp){
      var distanceArray = resp.map(addDistance);
      $scope.vendors = distanceArray.sort(DistanceCalc.compare);
    });

    // Applies a distance key and value to each set of bar data.
    function addDistance(bar){
      bar.distance = DistanceCalc.calcDistance(userLat, userLong, bar.latitude, bar.longitude);
      return bar;
    }

    // Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      $scope.vendors.forEach(addMarker);

      // ({
      //   icon: "https://mt.google.com/vt/icon?psize=20&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=%E2%80%A2"
      // })

      addMarker({
        latitude: userLat,
        longitude: userLong,
        name: "You Are Here",
        icon: "https://mt.google.com/vt/icon?psize=20&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=%E2%80%A2"
      });

      function addMarker(location){
        // Applies new marker
        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(location.latitude, location.longitude),/* || userLocation*/
          icon: location.icon
        });

        var contentString = '<div class="content">'+
        '<div class="siteNotice"></div>'+
        '<p>' + location.name + '</p>'+
        '</div>';

        // Adds an info window to the marker
        var infoWindow = new google.maps.InfoWindow({
          content: contentString/* || "You are here."*/
        });

        // Adds an event listener that causes the info window to appear and disappear on click of marker
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.open($scope.map, marker);
        });

        // loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        // bounds.extend(loc);
      }
    });

    // $scope.map.fitBounds(bounds);
    // $scope.map.panToBounds(bounds);

  }, function(error) {
    console.log(error);
    console.log("Could not get location");
  });
}]);
