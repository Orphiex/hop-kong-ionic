angular.module('hopKongIonic')

.controller('SettingsCtrl', ['$scope', '$auth', function($scope, $auth){

  $scope.logout = function () {
    $auth.signOut({config: 'user'}).then(function(resp) {
      console.log(resp);
    }).catch(function(resp) {
      console.log(resp);
    });
  };

  $scope.validate = function () {
    $auth.validateUser({config: 'user'}).then(function(resp) {
      console.log(resp);
    }).catch(function(resp) {
      console.log(resp);
    });
  };
}]);
