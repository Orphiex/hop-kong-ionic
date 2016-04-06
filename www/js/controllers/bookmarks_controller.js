angular.module('hopKongIonic')

.controller('BookmarksCtrl', ['$scope', 'BeerBookmarksResource', 'VendorBookmarksResource',function($scope, BeerBookmarksResource, VendorBookmarksResource){

  BeerBookmarksResource.query().$promise.then(function(resp){

  });

}]);
