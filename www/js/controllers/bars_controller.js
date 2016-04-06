angular.module('hopKongIonic')

.controller('BarsCtrl', ['$scope', 'BeerResource', 'StyleResource', 'BreweryResource', 'LocationResource', '$localStorage', 'CountryResource', function($scope, BeerResource, StyleResource, BreweryResource, LocationResource, $localStorage, CountryResource) {
  // these arrays store the items that have BEEN selected
  if ($localStorage.selectedBarGroups) {
    $scope.selectedBarGroups = $localStorage.selectedBarGroups; // stores the data in local storage for the results page
  } else {
    $scope.selectedBarGroups = {
      'HK Location': [],
      'Beer Country': [],
      'Beer Style': [],
      'Brewery Name': [],
      'Beer Name': []
    };
  }

  // these arrays store the items to BE selected from the backend
  $scope.groups = {
    'HK Location': {
      list: [],
      listStyle: 'Block'
    },
    'Beer Country': {
      list: [],
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

  // displays groups (eg country, style, location)
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  // shows or hides data
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  // adds or removes key (name) and values (items) selected in each group
  $scope.selectItem = function (name, item) {
    var itemIndex = $scope.selectedBarGroups[name].indexOf(item);
    itemIndex == -1 ? $scope.selectedBarGroups[name].push(item) : $scope.selectedBarGroups[name].splice(itemIndex, 1);
    $localStorage.selectedBarGroups = $scope.selectedBarGroups;
  };

  // returns the items selected
  $scope.isItemSelected = function (name, item) {
    return $scope.selectedBarGroups[name].indexOf(item) != -1;
  };

  // reset button
  $scope.deselectAll = function(name, item) {
    $scope.selectedBarGroups = {
      'HK Location': [],
      'Beer Country': [],
      'Beer Style': [],
      'Brewery Name': [],
      'Beer Name': []
    };
    delete $localStorage.selectedBarGroups;
  };

  $scope.isAllReady = function () {
    var isReady = true;

    for (var key in $scope.readyList) {
      isReady = isReady && $scope.readyList[key];
    }

    if (isReady) {
      setTimeout(function(){
        $scope.isReady = true;
      }, 10);
    }
  };


  $scope.readyList = {
    'HK Location': false,
    'Beer Country': false,
    'Beer Style': false,
    'Brewery Name': false,
    'Beer Name': false
  };

  // Beer.pluck(:country).uniq
  // Beer.pluck(:simpstyle).uniq

  //QUERIES
  // this is returning unique locations (eg Central, Wan Chai)
  LocationResource.query().$promise.then(function(response){
    $scope.groups['HK Location'].list = response;
    $scope.readyList['HK Location'] = true;
     $scope.isAllReady();
  });

  // this is returning unique countries for the beers (eg Hong Kong, USA)
  CountryResource.query().$promise.then(function(response){
    //console.log(response);
    $scope.groups['Beer Country'].list = response;
    $scope.readyList['Beer Country'] = true;
     $scope.isAllReady();
  });

  // this is obtaining unique beer style names (eg Lager, IPA)
  StyleResource.query().$promise.then(function(response){
    $scope.groups['Beer Style'].list = response;
    $scope.readyList['Beer Style'] = true;
     $scope.isAllReady();
  });

  // this is obtaining unique beer brewery names
  BreweryResource.query().$promise.then(function(response){
    $scope.groups['Brewery Name'].list = response;
    $scope.readyList['Brewery Name'] = true;
     $scope.isAllReady();
  });

  // this is obtaining all the beer names
  BeerResource.query().$promise.then(function(response){
    $scope.beers = response;
    $scope.groups['Beer Name'].list = $scope.beers.map(function(beer) { return beer.name; });
    $scope.readyList['Beer Name'] = true;
     $scope.isAllReady();
  });
}]);