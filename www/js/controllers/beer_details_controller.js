angular.module('hopKongIonic')

.controller('BeerDetailsCtrl', ['$scope', 'BeerDetailsResource', '$localStorage', '$http', '$stateParams', '$window', '$auth', function($scope, BeerDetailsResource, $localStorage, $http, $stateParams, $window, $auth) {
  console.log($stateParams.beer_id);
  BeerDetailsResource.get({id: $stateParams.beer_id}).$promise.then(function(response){
    $scope.beer = response;
    console.log(response);
  });

  // opens up social media icons in different window
  $scope.toBrowser = function (link) {
    $window.open(encodeURI(link), '_system');
  };

  // hides bookmark if user authenticated
  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    console.log("Logged In");
  }).catch(function(resp){
    $scope.user = null;
    console.log("Not Logged In");
  });


}]);