angular.module('hopKongIonic')

.controller('BeersListCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
  console.log($stateParams.vendor_id);

  $http({
    method: 'GET',
    url: "http://localhost:3000/api/beers_list.json",
    params: {vendor_id: $stateParams.vendor_id}
  }).then(function(resp){
    console.log(resp);
    $scope.beers = resp.data;
  }, function(resp){
    console.log(resp);
  });

}]);