angular.module('hopKongIonic')

.controller('BeersResultsCtrl', function ($scope, BeersResultsResource, BeerBookmarksResource, $localStorage, $http, $auth, LoggedIn, BeerBkmkService) {
  console.log($localStorage.selectedBeerGroups);
  //console.log($localStorage.quickSearch);

  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    console.log($scope.user);
    $scope.loggedIn = resp.signedIn;
    console.log("Logged In");
    getResults();
  }).catch(function(resp){
    $scope.user = {id: 0};
    console.log("Not Logged In");
    getResults();
  });

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

});
