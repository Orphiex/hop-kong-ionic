angular.module('hopKongIonic')

// still need to add CountryResource and VendorTypeResource
.controller('BeersCtrl', ['$scope', 'BeerResource', 'StyleResource', 'BreweryResource', 'LocationResource', '$localStorage',
  function($scope, BeerResource, StyleResource, BreweryResource, LocationResource, $localStorage) {
  // these arrays store the items that have BEEN selected
  if ($localStorage.selectedGroups) {
    $scope.selectedGroups = $localStorage.selectedGroups; // stores the data in local storage for the results page
  } else {
    $scope.selectedGroups = {
      'HK Location': [],
      'Vendor Type': [],
      'Beer Country': [],
      'Beer Style': [],
      'Brewery Name': [],
      'Beer Name': []
    };
  }

  // these arrays store the items to BE selected
  $scope.groups = {
    'HK Location': {
      list: [],
      listStyle: 'Block'
    },
    'Vendor Type': {
      list: ['Bar/Restaurant', 'Brewery', 'Online Store', 'Retail Store'],  // need to update seed data to pull this info
      listStyle: 'Block'
    },
    'Beer Country': {
      list: ['Hong Kong','USA'], // need to update seed data to pull this info
      listStyle: 'Block'
    },
    'Beer Style': {
      list: [],
      listStyle: 'Block'
    },
    'Brewery Name': {
      list: [],
      listStyle: 'Block'
    },
    'Beer Name': {
      list: [],
      listStyle: 'Block'
    }
  };

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
    $localStorage.selectedGroups = $scope.selectedGroups;
  };

  // returns the items selected
  $scope.isItemSelected = function (name, item) {
    return $scope.selectedGroups[name].indexOf(item) != -1;
  };


  // Beer.pluck(:country).uniq
  // Beer.pluck(:simpstyle).uniq

  //QUERIES
  LocationResource.query().$promise.then(function(response){
    $scope.groups['HK Location'].list = response;
  });

  //VendorTypeResource.query().$promise.then(function(response){
  //  console.log(response);
  //  $scope.groups['Vendor Type'] = response;
  //});

  //BeerCountryResource.query().$promise.then(function(response){
  //  console.log(response);
  //  $scope.groups['Beer Country'] = response;
  //});

  StyleResource.query().$promise.then(function(response){
    $scope.groups['Beer Style'].list = response;
  });

  BreweryResource.query().$promise.then(function(response){
    $scope.groups['Brewery Name'].list = response;
  });

  BeerResource.query().$promise.then(function(response){
    $scope.beers = response;
    $scope.groups['Beer Name'].list = $scope.beers.map(function(beer) { return beer.name; });  // this is obtaining the beer names
  });
}]);
