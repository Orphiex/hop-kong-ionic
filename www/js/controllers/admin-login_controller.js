angular.module('hopKongIonic')

.controller('LoginCtrl', ['$scope', '$auth', '$location', 'LoggedIn', function($scope, $auth, $location, LoggedIn){

  $scope.loginForm = {};

  $scope.login = function() {
    console.log($scope.loginForm);
    $auth.submitLogin($scope.loginForm, {config: 'admin'})
    .then(function(resp) {
      // handle success response
      console.log(resp);
      LoggedIn.loggedIn = true;
      LoggedIn.userType = resp;
      console.log(LoggedIn);

      // redirect back to root when registration succesfull
      $location.path('/home');
    }).catch(function(resp) {
      // handle error response
      console.log(resp);
      $scope.loggedIn = false;
    });
  };

}]);
