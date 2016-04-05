angular.module('hopKongIonic')

.controller('BeersCtrl', ['$scope', 'BeerResource', 'StyleResource', 'BreweryResource', 'LocationResource', '$localStorage', 'LoggedIn', 'VendorTypeResource', 'CountryResource', '$cordovaBarcodeScanner', 'BarcodeResource', '$ionicPlatform', function($scope, BeerResource, StyleResource, BreweryResource, LocationResource, $localStorage, LoggedIn, VendorTypeResource, CountryResource, $cordovaBarcodeScanner, BarcodeResource, $ionicPlatform) {

  // passes data on login status
  $scope.loggedIn = LoggedIn;

  $localStorage.quickSearch = undefined;

  // these arrays store the items that have BEEN selected
  if ($localStorage.selectedBeerGroups) {
    $scope.selectedBeerGroups = $localStorage.selectedBeerGroups; // stores the data in local storage for the results page
  } else {
    $scope.selectedBeerGroups = {
      'HK Location': [],
      'Vendor Type': [],
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
    'Vendor Type': {
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
    //console.log($scope.selectedBeerGroups);
    var itemIndex = $scope.selectedBeerGroups[name].indexOf(item);
    itemIndex == -1 ? $scope.selectedBeerGroups[name].push(item) : $scope.selectedBeerGroups[name].splice(itemIndex, 1);
    $localStorage.selectedBeerGroups = $scope.selectedBeerGroups;
  };

  // returns the items selected
  $scope.isItemSelected = function (name, item) {
    //console.log(name);
    return $scope.selectedBeerGroups[name].indexOf(item) != -1;
  };

  // reset button
  $scope.deselectAll = function(name, item) {
    $scope.selectedBeerGroups = {
      'HK Location': [],
      'Vendor Type': [],
      'Beer Country': [],
      'Beer Style': [],
      'Brewery Name': [],
      'Beer Name': []
    };
    delete $localStorage.selectedBeerGroups;
  };


  // Beer.pluck(:country).uniq
  // Beer.pluck(:simpstyle).uniq

  //QUERIES
  // this obtains unique locations (eg Central, Wan Chai)
  LocationResource.query().$promise.then(function(response){
    $scope.groups['HK Location'].list = response;
  });

  // this obtains unique vendor types (eg Bar/Restaurant, Online Retail)
  VendorTypeResource.query().$promise.then(function(response){
    // console.log(response);
    $scope.groups['Vendor Type'].list = response;
  });

  // this obtains unique countries for the beers (eg Hong Kong, USA)
  CountryResource.query().$promise.then(function(response){
    //console.log(response);
    $scope.groups['Beer Country'].list = response;
  });

  // this obtains the unique beer style names (eg Lager, IPA)
  StyleResource.query().$promise.then(function(response){
    $scope.groups['Beer Style'].list = response;
  });

  // this obtains unique beer brewery names (eg Anchor, Kona)
  BreweryResource.query().$promise.then(function(response){
    $scope.groups['Brewery Name'].list = response;
  });

  //this obtains all the beer names
  BeerResource.query().$promise.then(function(response){
  //   console.log(response);
    $scope.beers = response;
    $scope.groups['Beer Name'].list = $scope.beers.map(function(beer) { return beer.name; });
  });

  $scope.quickSearch = function(searchValue){
    console.log(searchValue);
    $localStorage.quickSearch = searchValue;
    console.log($localStorage.quickSearch);
  };

  $scope.scanBarcode = function(){
    $ionicPlatform.ready(function(){
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        console.log(imageData);
        // BarcodeResource.get({barcode:imageData.text}).$promise.then(function(response){
        //   console.log(response);
        //   $scope.beer = response;
        // });
        // console.log(imageData.text);
        // console.log("Barcode Format -> " + imageData.format);
        // console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
        console.log("An error happened -> " + error);
      });
    });
  };
}]);
