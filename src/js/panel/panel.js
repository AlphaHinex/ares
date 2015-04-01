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

      return function($scope) {
        $scope.panelOptions = {
          collapsible: true,
          open: true
        };
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
  var headTpl = 
    '<div class="panel-heading">' + 
    '  <span ng-transclude></span>' + 
    '  <span ng-show="panelOptions.collapsible" ' + 
    '        class="pull-right" ' + 
    '        style="cursor:pointer;" ' + 
    '        ng-class="{\'ares-minus\': panelOptions.open, \'ares-plus\': !panelOptions.open}" ' + 
    '        ng-click="panelOptions.open=!panelOptions.open"></span>' +
    '</div>';
  return {
    restrict: 'E',
    replace: true,
    template: headTpl,
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
    template: '<div class="panel-body" ng-show="panelOptions.open" ng-transclude></div>',
    transclude: true
  };
}]);