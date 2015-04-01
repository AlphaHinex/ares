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
    scope: true,
    compile: function($tElement, $tAttrs) {
      var expectedAttrs = {
        type: {
          key: 'class', 
          values: {
            defaultVal: 'panel',
            search: 'panel panel-default',
            simple: 'panel',
            main: 'panel panel-primary'
          }
        },
        collapsible: {
          key: 'collapsible',
          values: {
            defaultVal: true,
            'true': true,
            'false': false
          },
          exclude: true
        },
        open: {
          key: 'open',
          values: {
            defaultVal: true,
            'true': true,
            'false': false
          },
          exclude: true
        }
        // More here to be implemented
      };

      var panelOptions = { };
      // get options from element first
      panelOptions.collapsible = 'false' === $tAttrs.collapsible ? false : true;
      panelOptions.open = 'false' === $tAttrs.open ? false : true;
      // if collapsible is false, force set open to true
      if(!panelOptions.collapsible) {
        panelOptions.open = true;
      }

      var elementHtml = '<div ng-transclude ' +
                              attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                             '>' + 
                        '</div>';
      $tElement.html(elementHtml);

      return function($scope) {
        $scope.panelOptions = panelOptions;
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