'use strict'

angular.module('ares').controller('demoListCtrl', ['$scope', function($scope) {
  $scope.data = [
    {
      name: 'row one in list, show'
    },
    {
      name: 'row two in list, hide'
    },
    {
      name: 'row three in list, show'
    }
  ];
  $scope.clickItem = function(item) {
    console.log('row two not show because of filter')
  };
}]);
