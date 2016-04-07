angular.module('hopKongIonic')


.factory('BeerResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/beers.json");
}])
.factory('StyleResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/beer_styles.json");}])
.factory('BreweryResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/beer_breweries.json");
}])
.factory('LocationResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/beer_locations.json");
}])
.factory('UserSession', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/user/auth/sign_in");
}])
.factory('BeersResultsResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/beers_results.json");
}])
.factory('LoggedIn', ['$http', function($http){
  return {
    loggedIn: false,
    userType: null
  };
}])
.factory('BarsResultsResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/bars_results.json");
}])
.factory('VendorDetailsResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/vendors/:id.json");
}])
.factory('VendorTypeResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/vendor_types.json");
}])
.factory('AllBarsResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/all_bars.json");
}])
.factory('BarcodeResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/barcode.json");
}])
.factory('BeerBookmarksResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/beer_bookmarks.json");
}])
.factory('VendorBookmarksResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/vendor_bookmarks.json");
}])
.factory('CountryResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/beer_countries.json");
}])
.factory('BeerDetailsResource', ['$resource', function($resource) {
  return $resource("https://hop-kong-rails.herokuapp.com/api/beers/:id.json");
}])
.factory('VendorsListResource', ['$resource', function($resource){
  return $resource("https://hop-kong-rails.herokuapp.com/api/vendors_list.json");
}])

// Contains functions for calculating proximity
.service('DistanceCalc', function(){
  this.calcDistance = function(lat1, lon1, lat2, lon2){
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
  };

  this.compare = function(a,b){
    if (a.distance == "Unknown")
      return 1;
    else if
      (a.distance < b.distance)
      return -1;
    else if (a.distance > b.distance)
      return 1;
    else
      return 0;
  };
})
.service('BeerBkmkService', function($http, $q){
  this.addBeerBookmark = function(user_id, beer_id){
    return $q(function(resolve,reject){
      var data = {user_id: user_id, beer_id: beer_id};
      $http({
        method: 'POST',
        url: "https://hop-kong-rails.herokuapp.com/api/beer_bookmarks",
        params: data
      }).then(function(resp){
        console.log(resp);
        resolve(resp);
      },function(resp){
        console.log(resp);
        reject(resp);
      });
    });
  };
  this.removeBeerBookmark = function(bkmk_id){
    return $q(function(resolve,reject){
      $http({
        method: 'DELETE',
        url: "https://hop-kong-rails.herokuapp.com/api/beer_bookmarks/"+bkmk_id,
      }).then(function(resp){
        console.log(resp);
        resolve(resp);
      },function(resp){
        console.log(resp);
        reject(resp);
      });
    });
  };
})

.service('VendorBkmkService', function($http, $q){
  this.addVendorBookmark = function(user_id, vendor_id){
    return $q(function(resolve,reject){
      var data = {user_id: user_id, vendor_id: vendor_id};
      $http({
        method: 'POST',
        url: "https://hop-kong-rails.herokuapp.com/api/vendor_bookmarks",
        params: data
      }).then(function(resp){
        console.log(resp);
        resolve(resp);
      }, function(resp){
        console.log(resp);
        reject(resp);
      });
    });
  };

  this.removeVendorBookmark = function(bkmk_id){
    return $q(function(resolve,reject){
      $http({
        method: 'DELETE',
        url: "https://hop-kong-rails.herokuapp.com/api/vendor_bookmarks/"+bkmk_id,
      }).then(function(resp){
        console.log(resp);
        resolve(resp);
      }, function(resp){
        console.log(resp);
        reject(resp);
      });
    });
  };
});

// also need to update localhost in bars_results_controller and beers_results_controller
// http://localhost:3000
