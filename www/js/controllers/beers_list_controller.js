angular.module('hopKongIonic')

.controller('BeersListCtrl', ['$scope', '$http', '$auth', '$stateParams', function($scope, $http, $auth, $stateParams){
  console.log($stateParams.vendor_id);

  $http({
    method: 'GET',
    // update for Heroku
    url: "http://localhost:3000/api/beers_list.json",
    params: {vendor_id: $stateParams.vendor_id}
  }).then(function(resp){
    console.log(resp);
    $scope.beers = resp.data;
  }, function(resp){
    console.log(resp);
  });

  $auth.validateUser().then(function(resp){
    $scope.user = resp;
  }).catch(function(resp){
    $scope.user = null;
    console.log("Not Logged In");
  });

  // add a beer bookmark
  $scope.addBookmark = function(beer_id){
    BeerBkmkService.addBeerBookmark($scope.user.id, beer_id).then(function(){
      getResults();
    });
  };
  // delete a beer bookmark
  $scope.deleteBookmark = function(bkmk_id){
    BeerBkmkService.removeBeerBookmark(bkmk_id).then(function(){
      getResults();
    });
  };

}]);
