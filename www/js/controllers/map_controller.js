angular.module('hopKongIonic').controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // var bounds  = new google.maps.LatLngBounds();

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      var infoWindow = new google.maps.InfoWindow({
        content: "You are here."
      });

      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.open($scope.map, marker);
      });

      // loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
      // bounds.extend(loc);
    });

    // $scope.map.fitBounds(bounds);
    // $scope.map.panToBounds(bounds);

  }, function(error){
    console.log("Could not get location");
  });
});
