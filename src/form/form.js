'use strict';

var deps = [
  'ui.bootstrap',
  'ares.utils'
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
    template: '<form novalidate="" ng-transclude></form>',
    replace: true,
    transclude: true
  };
}])

/**
 * @ngdoc directive
 * @name ares.directive:aresFormRow
 * @description
 * # aresFormRow
 */
.directive('aresFormRow', [function(){
  // Runs during compile
  return {
    restrict: 'E',
    template: '<div class="row" ng-transclude></div>',
    replace: true,
    transclude: true
  };
}]);