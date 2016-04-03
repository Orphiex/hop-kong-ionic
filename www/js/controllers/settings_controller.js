angular.module('hopKongIonic')

.controller('SettingsCtrl', ['$scope', '$auth', 'LoggedIn', function($scope, $auth, LoggedIn){

  $scope.logout = function () {
    $auth.signOut({config: 'user'}).then(function(resp) {
      console.log(resp);
    }).catch(function(resp) {
      console.log(resp);
    });
  };

  $scope.loggedIn = LoggedIn;

  $scope.validate = function () {
    $auth.validateUser({config: 'user'}).then(function(resp) {
      console.log(resp);
    }).catch(function(resp) {
      console.log(resp);
    });
  };
}]);
