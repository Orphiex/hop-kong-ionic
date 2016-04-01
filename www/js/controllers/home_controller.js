angular.module('hopKongIonic')

.controller('HomeCtrl', ['$scope', '$auth', function($scope, $auth){
  $scope.loggedIn = null;

  $auth.validateUser({config: 'user'}).then(function(resp) {
    console.log(resp);
    LoggedIn.loggedIn = true;
    LoggedIn.userType = resp;
    console.log(LoggedIn);
  }).catch(function(resp) {
    console.log(resp);
    $scope.loggedIn = false;
  });
}]);
