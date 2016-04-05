angular.module('hopKongIonic')

.controller('MapCtrl', ['$scope', /*'$state',*/ '$localStorage', '$cordovaGeolocation', 'LoggedIn', 'AllBarsResource', function($scope, /*$state,*/ $localStorage, $cordovaGeolocation, LoggedIn, AllBarsResource) {

  // Adds a time delay
  var options = {timeout: 5000, enableHighAccuracy: true};

  $scope.vendors = [];

  var orderLetters = ['A','B','C','D','E','F','G','H','I','J'];

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
      $scope.vendors = distanceArray.sort(compare);
      console.log($scope.vendors);
    });

    // Applies a distance key and value to each set of bar data.
    function addDistance(bar){
      // console.log(bar);
      bar.distance = calcDistance(userLat, userLong, bar.latitude, bar.longitude);
      return bar;
      // console.log(bar);
    }

    // Simple sorting function for ordering bar results by proximity.
    function compare(a,b){
      if (a.distance < b.distance)
        return -1;
      else if (a.distance > b.distance)
        return 1;
      else
        return 0;
    }

    // Calculates the exact distance between two points on a map.  NOTE: this formula calculates distance in a straight line, not distances on foot.
    function calcDistance(lat1, lon1, lat2, lon2) {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515 * 1.609344;
      dist = (dist.toFixed(2))/1;
      return dist;
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
        console.log(location);
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

  }, function(error){
    console.log("Could not get location");
  });
}]);
