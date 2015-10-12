'use strict'

angular.module('ares').controller('demoSidenavCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
  $scope.toggleSidenav = function(id) {
    $mdSidenav(id).toggle();
  };
}]);
