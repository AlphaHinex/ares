'use strict';

angular.module('ares.container', ['ui.bootstrap'])

/**
 * @ngdoc directive
 * @name aresApp.directive:aresContainer
 * @description
 * # aresContainer
 */
.directive('aresContainer', [function() {
  return {
    restrict: 'E',
    template: '<div class="container-fluid" ng-transclude></div>',
    replace: true,
    transclude: true
  };
}]);