angular.module('hopKongIonic')

.controller('BeersCtrl', ['$scope', 'BeerResource', 'StyleResource', 'BreweryResource', 'LocationResource',
  function($scope, BeerResource, StyleResource, BreweryResource, LocationResource) {

  BeerResource.query().$promise.then(function(response){
    $scope.beers = response;
    $scope.groups['Beer Name'] = $scope.beers.map(function(beer) { return beer.name; });
    //console.log(response);
  });

  // these arrays store the items that have BEEN selected
  $scope.selectedGroups = {
    'HK Location': [],
    'Vendor Type': [],
    'Beer Country': [],
    'Beer Style': [],
    'Brewery Name': [],
    'Beer Name': []
  };

  // these arrays store the items to BE selected
  $scope.groups = {
    'HK Location': [],
    'Vendor Type': ['Online Store', 'Retail Store', 'Brewery', 'Bar or Restaurant'], // pull these from the database
    'Beer Country': ['USA', 'Hong Kong'], // need to update the seed data to do this
    'Beer Style': [],
    'Brewery Name': [],
    'Beer Name': [] // pull these from the database
  };
 // Beer.pluck(:country).uniq
 // Beer.pluck(:simpstyle).uniq

  //CountryResource.query().$promise.then(function(response){
  //  console.log(response);
  //  $scope.groups['Country'] = response;
  //});

  StyleResource.query().$promise.then(function(response){
    //console.log(response);
    $scope.groups['Beer Style'] = response;
  });

  BreweryResource.query().$promise.then(function(response){
    //console.log(response);
    $scope.groups['Brewery Name'] = response;
  });

  LocationResource.query().$promise.then(function(response){
    console.log(response);
    $scope.groups['HK Location'] = response;
  });





  // shows or hides group (eg country, style, location)
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  //
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  // adds or removes key (name) and values (items) selected in each group
  $scope.selectItem = function (name, item) {
    var itemIndex = $scope.selectedGroups[name].indexOf(item);
    itemIndex == -1 ? $scope.selectedGroups[name].push(item) : $scope.selectedGroups[name].splice(itemIndex, 1);
    //console.log($scope.selectedGroups);
  };

  // returns the items selected
  $scope.isItemSelected = function (name, item) {
    return $scope.selectedGroups[name].indexOf(item) != -1;
  };
}]);
