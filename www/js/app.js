// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('hopKongIonic', ['ionic', 'ngCordova', 'ngResource', 'ng-token-auth', 'puigcerber.capitalize', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $httpProvider.defaults.withCredentials = true;

  // setup an abstract state for the tabs directive
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  }).state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'SettingsCtrl'
  }).state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  }).state('beers', {
    url: '/beers',
    templateUrl: 'templates/beers.html',
    controller: 'BeersCtrl'
  }).state('beers-results', {
    url: '/beers/results', // change to beers results?
    templateUrl: 'templates/beers-results.html',
    controller: 'BeersResultsCtrl',
    cache: false
  }).state('bars', {
    url: '/bars',
    templateUrl: 'templates/bars.html',
    controller: 'BarsCtrl'
  }).state('bars-results', {
    url: '/bars/results', // change to bars results?
    templateUrl: 'templates/bars-results.html',
    controller: 'BarsResultsCtrl',
    cache: false
  })
  // .state('vendors', {
  //   url: '/vendors',
  //   templateUrl: 'templates/vendors.html',
  //   controller: 'VendorsCtrl'
  // })
  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  }).state('all_bars', {
    url: '/all_bars',
    templateUrl: 'templates/all_bars.html',
    controller: 'AllBarsCtrl'
  }).state('barcode', {
    url: '/barcode',
    templateUrl: 'templates/barcode.html',
    controller: 'BarcodeCtrl'
  });

  $urlRouterProvider.otherwise("/home");

  $authProvider.configure([
    {
      default: {
        apiUrl:                  'http://localhost:3000',
        proxyIf:                 function() { window.isOldIE(); },
        storage:                 'localStorage'
      }
    },
    {
      user: {
        tokenValidationPath:     '/user/auth/validate_token',
        signOutUrl:              '/user/auth/sign_out',
        emailRegistrationPath:   '/user/auth',
        accountUpdatePath:       '/user/auth',
        accountDeletePath:       '/user/auth',
        passwordResetPath:       '/user/auth/password',
        passwordUpdatePath:      '/user/auth/password',
        emailSignInPath:         '/user/auth/sign_in',
      }
    },{
      admin: {
        tokenValidationPath:     '/auth/admin/validate_token',
        signOutUrl:              '/auth/admin/sign_out',
        emailRegistrationPath:   '/auth/admin',
        accountUpdatePath:       '/auth/admin',
        accountDeletePath:       '/auth/admin',
        passwordResetPath:       '/auth/admin/password',
        passwordUpdatePath:      '/auth/admin/password',
        emailSignInPath:         '/auth/admin/sign_in'
      }
    }
  ]);
}]);
