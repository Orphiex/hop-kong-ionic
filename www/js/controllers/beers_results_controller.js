angular.module('hopKongIonic')

.controller('BeersResultsCtrl', function ($scope, BeersResultsResource, BeerBookmarksResource, $localStorage, $http, $auth, BeerBkmkService) {
  console.log($localStorage.selectedBeerGroups);
  //console.log($localStorage.quickSearch);

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

  // beers quick search
  function getResults(){
    if ($localStorage.quickSearch === undefined){
      $http({
        method: 'GET',
        // update for Heroku
        url: "http://localhost:3000/api/beers_results.json",
        paramSerializer: '$httpParamSerializerJQLike',
        params: {
          data: $localStorage.selectedBeerGroups,
          user_id_tmp: $scope.user.id
        }
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
        url: "http://localhost:3000/api/beers_quicksearch.json",
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
