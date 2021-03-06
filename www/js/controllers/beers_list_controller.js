angular.module('hopKongIonic')

.controller('BeersListCtrl', ['$scope', '$http', '$auth', '$stateParams', 'BeerBkmkService', function($scope, $http, $auth, $stateParams, BeerBkmkService){
  console.log($stateParams.vendor_id);

  // $auth.validateUser().then(function(resp){
  //   $scope.user = resp;
  //   $scope.loggedIn = resp.signedIn;
  //   getResults();
  // }).catch(function(resp){
  //   $scope.user = {id: 0};
  //   $scope.loggedIn = false;
  //   getResults();
  // });

  var getResults = function(){
    var data = {
      vendor_id: $stateParams.vendor_id
      // user_id_tmp: $scope.user.id
    };
    $http({
      method: 'GET',
      url: "https://hop-kong-rails.herokuapp.com/api/beers_list.json",
      params: data
    }).then(function(resp){
      console.log(resp);
      $scope.beers = resp.data;
    }, function(resp){
      console.log(resp);
    });
  };

  getResults();

}]);
