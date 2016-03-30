angular.module('hopKongIonic').factory('BeerReturn', function($resource) {
  return $resource("http://localhost:3000/beers/:id.json");
});
