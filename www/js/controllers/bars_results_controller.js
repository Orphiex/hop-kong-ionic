angular.module('hopKongIonic')

.controller('BarsResultsCtrl', function ($scope, BarsResultsResource, $localStorage, $http, $auth) {
  console.log($localStorage.selectedGroups);

  // $scope.list = [];

  $http({
    method: 'GET',
    // update for Heroku
    url: "http://localhost:3000/api/bars_results.json",
    paramSerializer: '$httpParamSerializerJQLike',
    params: $localStorage.selectedGroups
  }).then(function (resp) {
    console.log(resp.data);
    $scope.vendors = resp.data;
    console.log($scope.list);
  }, function (resp) {
    console.log(resp);
  });

  // $scope.populateList = function(){
  //   for (var i = 0; i <= 9; i++) {
  //     if ($scope.vendors.length > 0){
  //       $scope.list.push($scope.vendors.splice(0,1));
  //     }
  //   }
  //   $scope.$broadcast('scroll.infiniteScrollComplete');
  // };

  // $scope.canWeLoadMoreContent = function() {
  //   return ($scope.vendors.length > 0) ? true : false;
  // };

  // $scope.populateList();

  // code below hides bookmark if user is authenticated
  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    console.log("Logged In");
  }).catch(function(resp){
    $scope.user = null;
    console.log("Not Logged In");
  });
});

// ['$scope', 'BeerResource', '$localStorage']