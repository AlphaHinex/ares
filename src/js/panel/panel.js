'use strict';

angular.module('ares.panel', ['ui.bootstrap'])

/**
 * @ngdoc directive
 * @name aresApp.directive:aresPanel
 * @description
 * # aresPanel
 */
.directive('aresPanel', ['attrUtil', function(attrUtil) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    compile: function($tElement) {
      var expectedAttrs = {
        type: {
          key: 'class', 
          values: {
            defaultVal: 'panel',
            search: 'panel panel-default',
            simple: 'panel',
            main: 'panel panel-primary'
          }
        }
        // More here to be implemented
      };

      var elementHtml = '<div ng-transclude ' +
                              attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                             '>' + 
                        '</div>';
      $tElement.html(elementHtml);

      return function() {
      };
    }
  };
}])

/**
 * @ngdoc directive
 * @name aresApp.directive:aresPanelHead
 * @description
 * # aresPanelHead
 */
.directive('aresPanelHead', [function(){
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="panel-heading" ng-transclude></div>',
    transclude: true
  };
}])

/**
 * @ngdoc directive
 * @name aresApp.directive:aresPanelBody
 * @description
 * # aresPanelBody
 */
.directive('aresPanelBody', [function(){
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="panel-body" ng-transclude></div>',
    transclude: true
  };
}]);