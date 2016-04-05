angular.module('hopKongIonic')

.controller('VendorsListCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

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

}]);
