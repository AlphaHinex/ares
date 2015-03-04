'use strict';

var deps = [
  'ares.utils',
  'ui.bootstrap'
];

angular.module('ares.form', deps)

/**
 * @ngdoc directive
 * @name ares.directive:aresForm
 * @description
 * # aresForm
 */
.directive('aresForm', [function() {
  return {
    restrict: 'E',
    template: '<form class="form-horizontal" novalidate="" ng-transclude></form>',
    replace: true,
    transclude: true
  };
}]);