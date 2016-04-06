angular.module('hopKongIonic')

.controller('BeerDetailsCtrl', ['$scope', '$localStorage', '$http', '$stateParams', '$window', '$auth', 'BeerDetailsResource', 'BeerBkmkService', function($scope, $localStorage, $http, $stateParams, $window, $auth, BeerDetailsResource, BeerBkmkService) {

  console.log($stateParams.beer_id);

  // hides bookmark if user authenticated
  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    $scope.loggedIn = resp.signedIn;
    console.log("Logged In");
    getResults();
  }).catch(function(resp){
    $scope.user = {id: 0};
    $scope.loggedIn = false;
    console.log("Not Logged In");
    getResults();
  });

  function getResults(){
    BeerDetailsResource.get({id: $stateParams.beer_id}).$promise.then(function(response){
      $scope.beer = response;
      console.log(response);
    });
  }

  // opens up social media icons in different window
  $scope.toBrowser = function (link) {
    $window.open(encodeURI(link), '_system');
  };

  $scope.addBookmark = function(beer_id){
    BeerBkmkService.addBeerBookmark($scope.user.id, beer_id);
    getResults();
  };

  $scope.deleteBookmark = function(bkmk_id){
    BeerBkmkService.removeBeerBookmark(bkmk_id);
    getResults();
  };

}]);