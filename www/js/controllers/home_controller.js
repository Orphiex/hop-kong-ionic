angular.module('hopKongIonic')

.controller('HomeCtrl', ['$scope', '$auth', 'LoggedIn', function($scope, $auth, LoggedIn){
  $scope.loggedIn = LoggedIn;
  console.log($scope.loggedIn);

  // $auth.validateUser({config: 'user'}).then(function(resp) {
  //   console.log(resp);
  //   LoggedIn.loggedIn = true;
  //   LoggedIn.userType = resp;
  //   console.log(LoggedIn);
  // }).catch(function(resp) {
  //   console.log(resp);
  //   $scope.loggedIn = false;
  // });
}]);
