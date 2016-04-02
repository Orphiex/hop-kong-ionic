angular.module('hopKongIonic')


.factory('BeerResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beers.json");
}])
.factory('VendorResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/vendors.json");
}])
.factory('StyleResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beer_styles.json");
}])
.factory('BreweryResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beer_breweries.json");
}])
.factory('LocationResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beer_locations.json");
}])
.factory('UserSession', ['$resource', function($resource) {
  return $resource("http://localhost:3000/user/auth/sign_in");
}])
.factory('BeersResultsResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beers_results.json");
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
.factory('VendorTypeResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/vendor_types.json");
}])
.factory('AllBarsResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/all_bars.json");
}]);

