angular.module('hopKongIonic')

.factory('BeerResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/beers.json");
}])
.factory('VendorResource', ['$resource', function($resource) {
  return $resource("http://localhost:3000/api/vendors.json");
}])
;
