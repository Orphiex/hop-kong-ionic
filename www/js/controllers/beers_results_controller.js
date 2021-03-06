angular.module('hopKongIonic')

.controller('BeersResultsCtrl', function ($scope, BeersResultsResource, BeerBookmarksResource, $localStorage, $http, $auth, BeerBkmkService) {
  console.log($localStorage.selectedBeerGroups);
  //console.log($localStorage.quickSearch);

  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    $scope.loggedIn = resp.signedIn;
    getResults();
  }).catch(function(resp){
    $scope.user = {id: 0};
    $scope.loggedIn = false;
    getResults();
  });

  // beers quick search
  function getResults(){
    if ($localStorage.quickSearch === undefined){
      $http({
        method: 'GET',
        // update for Heroku
        url: "https://hop-kong-rails.herokuapp.com/api/beers_results.json",
        paramSerializer: '$httpParamSerializerJQLike',
        params: $localStorage.selectedBeerGroups
      }).then(function (resp) {
        console.log(resp);
        $scope.beers = resp.data;
      }, function (resp) {
        console.log(resp);
      });
    } else {
      var data = {
        string: $localStorage.quickSearch.toLowerCase(),
        user_id_tmp: $scope.user.id
      };
      $http({
        method: 'GET',
        // update for Heroku
        url: "https://hop-kong-rails.herokuapp.com/api/beers_quicksearch.json",
        // paramSerializer: '$httpParamSerializerJQLike',
        params: data
      }).then(function (resp) {
        console.log(resp);
        $scope.beers = resp.data;
      }, function (resp) {
        console.log(resp);
      });
    }
  }

  // adds a Beer bookmark
  $scope.addBookmark = function(beer_id){
    BeerBkmkService.addBeerBookmark($scope.user.id, beer_id).then(function(){
      getResults();
    });
  };

  // deletes a Beer bookmark
  $scope.deleteBookmark = function(bkmk_id){
    BeerBkmkService.removeBeerBookmark(bkmk_id).then(function(){
      getResults();
    });
  };

});
