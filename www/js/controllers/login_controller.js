angular.module('hopKongIonic')

.controller('LoginCtrl', ['$scope', '$auth', '$location', function($scope, $auth, $location){

  $scope.loginForm = {};

  $scope.login = function() {
    console.log($scope.loginForm);
    $auth.submitLogin($scope.loginForm, {config: 'user'})
    .then(function(resp) {
      // handle success response
      console.log(resp);
      // redirect back to root when registration succesfull
      $location.path('/settings');
    }).catch(function(resp) {
      // handle error response
      console.log(resp);
    });
  };

}]);
