angular.module('hopKongIonic')

.controller('BeerDetailsCtrl', ['$scope', '$localStorage', '$http', '$stateParams', '$window', '$auth', 'BeerDetailsResource', 'BeerBkmkService', '$rootScope', function($scope, $localStorage, $http, $stateParams, $window, $auth, BeerDetailsResource, BeerBkmkService, $rootScope) {

  $rootScope.$on('auth:login-success', function(ev, user) {
    $scope.user = user;
    $scope.loggedIn = user.signedIn;
  });
  $rootScope.$on('auth:registration-email-success', function(ev, user) {
    $scope.user = user;
    $scope.loggedIn = user.signedIn;
  });
  $rootScope.$on('auth:logout-success', function(ev) {
    $scope.user = {id: 0};
    $scope.loggedIn = false;
  });

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
    BeerDetailsResource.get({id: $stateParams.beer_id, user_id: $scope.user.id}).$promise.then(function(response){
      $scope.beer = response;
      console.log(response);
    });
  }

  // opens up social media icons in different window
  $scope.toBrowser = function (link) {
    $window.open(encodeURI(link), '_system');
  };

  // adds a beer bookmark
  $scope.addBookmark = function(beer_id){
    BeerBkmkService.addBeerBookmark($scope.user.id, beer_id).then(function(){
      getResults();
    });
  };

  // adds a beer bookmark
  $scope.deleteBookmark = function(bkmk_id){
    BeerBkmkService.removeBeerBookmark(bkmk_id).then(function(){
      getResults();
    });
  };

}]);