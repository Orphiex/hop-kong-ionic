angular.module('hopKongIonic')

.controller('SettingsCtrl', ['$scope', '$auth', 'LoggedIn', function($scope, $auth, LoggedIn){

  $scope.logout = function () {
    console.log(LoggedIn);
    $auth.signOut({config: 'user'}).then(function(resp) {
      console.log(resp);
      LoggedIn.loggedIn = false;
    }).catch(function(resp) {
      console.log(resp);
    });
  };

  // passes data on login status
  $scope.loggedIn = LoggedIn;

  $scope.validate = function () {
    $auth.validateUser({config: 'user'}).then(function(resp) {
      console.log(resp);
    }).catch(function(resp) {
      console.log(resp);
    });
  };
}]);
