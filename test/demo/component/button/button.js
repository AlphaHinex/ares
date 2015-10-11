'use strict'

angular.module('ares').controller('demoButtonCtrl', ['$scope', function($scope) {
  $scope.click = function() {
    console.log('click button');
  };
}]);
