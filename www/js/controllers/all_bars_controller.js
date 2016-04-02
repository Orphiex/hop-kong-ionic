angular.module('hopKongIonic')

.controller('AllBarsCtrl', ['$scope', '$http', '$localStorage', 'LoggedIn', function($scope, $http, $localStorage, LoggedIn){

  $http({
    method: 'GET',
    url: "http://localhost:3000/api/all_bars.json",
    paramSerializer: '$httpParamSerializerJQLike',
    params: $localStorage.selectedGroups
  }).then(function (resp) {
    console.log(resp);
    $scope.results = resp.data;
  }, function (resp) {
    console.log(resp);
  });

}]);
