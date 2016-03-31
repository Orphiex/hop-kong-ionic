angular.module('hopKongIonic')

.controller('SignupCtrl', ['$scope', function($scope){
  $scope.signup = function () {
    $auth.submitRegistration($scope.registrationForm)
    .then(function(resp) {
      // handle success response
      console.log(resp);
      // redirect back to root when registration succesfull
      $location.path('/');
    }).catch(function(resp) {
      // handle error response
      console.log(resp);
    });
  };
}]);
