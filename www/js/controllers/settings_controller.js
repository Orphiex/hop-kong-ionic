angular.module('hopKongIonic')

.controller('SettingsCtrl', ['$scope', function($scope){

  $scope.logout = function () {
    $auth.signOut().then(function(resp) {
      console.log(resp);
    }).catch(function(resp) {
      console.log(resp);
    });
  };

}]);
