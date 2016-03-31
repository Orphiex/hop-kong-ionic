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
;
