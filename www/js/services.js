angular.module('hopKongIonic')


.factory('BeerResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beers.json"); // need to update for Heroku but cannot just remove http://localhost:3000
}])
.factory('VendorResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/vendors.json"); // need to update for Heroku but cannot just remove http://localhost:3000
}])
.factory('StyleResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beer_styles.json"); // need to update for Heroku but cannot just remove http://localhost:3000
}])
.factory('BreweryResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beer_breweries.json"); // need to update for Heroku but cannot just remove http://localhost:3000
}])
.factory('LocationResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beer_locations.json"); // need to update for Heroku but cannot just remove http://localhost:3000
}])
.factory('UserSession', ['$resource', function($resource) {
  return $resource("http://localhost:3000/user/auth/sign_in"); // need to update for Heroku but cannot just remove http://localhost:3000
}])
.factory('BeersResultsResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beers_results.json"); // need to update for Heroku but cannot just remove http://localhost:3000
}])
.factory('LoggedIn', ['$http', function($http){
  return {
    loggedIn: false,
    userType: null
  };
}])
.factory('BarsResultsResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/bars_results.json");
}])
.factory('VendorDetailsResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/vendors/:id.json");
}])
.factory('VendorTypeResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/vendor_types.json");
}])
.factory('AllBarsResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/all_bars.json");
}])
.factory('BarcodeResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/barcode.json");
}]);

// also need to update localhost in bars_results_controller and beers_results_controller
// http://localhost:3000
