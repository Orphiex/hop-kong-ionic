angular.module('hopKongIonic')

.controller('SignupCtrl', ['$scope', '$auth', '$location', function($scope, $auth, $location){
  $scope.registrationForm = {};

  $scope.signup = function () {
    console.log($scope.registrationForm);
    $auth.submitRegistration($scope.registrationForm, {config: 'user'})
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
