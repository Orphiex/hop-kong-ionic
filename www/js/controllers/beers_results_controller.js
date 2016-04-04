angular.module('hopKongIonic')

.controller('BeersResultsCtrl', function ($scope, BeersResultsResource, BeerBookmarksResource, $localStorage, $http, $auth, LoggedIn) {
  console.log($localStorage.selectedGroups);
  console.log($localStorage.quickSearch);

  if ($localStorage.quickSearch == undefined){
    $http({
      method: 'GET',
      // update for Heroku
      url: "http://localhost:3000/api/beers_results.json",
      paramSerializer: '$httpParamSerializerJQLike',
      params: $localStorage.selectedGroups
    }).then(function (resp) {
      console.log(resp);
      $scope.vendors = resp.data;
    }, function (resp) {
      console.log(resp);
    });
  } else {
    var data = $localStorage.quickSearch;
    $http({
      method: 'GET',
      // update for Heroku
      url: "http://localhost:3000/api/beers_quicksearch.json",
      // paramSerializer: '$httpParamSerializerJQLike',
      params: data
    }).then(function (resp) {
      console.log(resp);
      $scope.vendors = resp.data;
    }, function (resp) {
      console.log(resp);
    });
  }

  // code below hides bookmark if user is not authenticated
  $auth.validateUser().then(function(resp){
    $scope.user = resp;
    $scope.loggedIn = resp.signedIn;
    console.log($scope.user.id);
    console.log("Logged In");
    var data = {user_id: $scope.user.id};
    getBeerBookmarks(data);
  }).catch(function(resp){
    $scope.user = null;
    console.log("Not Logged In");
  });

  function getBeerBookmarks(data){
    $http({
      method: 'GET',
      url: "http://localhost:3000/api/beer_bookmarks",
      params: data
    }).then(function (resp) {
      console.log(resp.data);
      $scope.vendors = resp.data;
    }, function (resp) {
      console.log(resp);
    });
  }

  $scope.addBeerBookmark = function(beer_id){
    var data = {user_id: $scope.user.id, beer_id: beer_id};
    $http({
      method: 'POST',
      url: "http://localhost:3000/api/beer_bookmarks",
      params: data
    }).then(function(resp){
      var data = {user_id: $scope.user.id};
      getBookmarks(data);
    }, function(resp){
      console.log(resp);
    });
  };

  $scope.removeBeerBookmark = function(id){
    $http({
      method: 'DELETE',
      url: "http://localhost:3000/api/beer_bookmarks/"+id,
    }).then(function(resp){
      var data = {user_id: $scope.user.id};
      getBookmarks(data);
    }, function(resp){
      console.log(resp);
    });
  };

    // BeerBookmarksResource.query().$promise.then(function(response){
    //   $scope.bookmarks = response;
    //   console.log(response);
    // });

});



// ['$scope', 'BeerResource', '$localStorage']