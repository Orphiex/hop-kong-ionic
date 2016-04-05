angular.module('hopKongIonic')

.controller('VendorsListCtrl', ['$scope', '$http', '$auth', '$stateParams', function($scope, $http, $auth, $stateParams){

  $http({
    method: 'GET',
    url: "http://localhost:3000/api/vendors_list.json",
    params: {beer_id: $stateParams.beer_id}
  }).then(function(resp){
    console.log(resp);
    $scope.vendors = resp.data;
  }, function(resp){
    console.log(resp);
  });

  $auth.validateUser().then(function(resp){
    $scope.user = resp;
  }).catch(function(resp){
    $scope.user = null;
    console.log("Not Logged In");
  });

}]);
