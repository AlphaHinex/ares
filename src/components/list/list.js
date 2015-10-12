'use strict';

angular.module('ares.components.list', ['ngMaterial'])

/**
 * @ngdoc directive
 * @name ares.directive:aresList
 * @description
 * # aresList
 */
  .directive('aresList', ['attrUtil', function(attrUtil) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      compile: function($tEle, $tAttrs) {
        var expectedAttrs = {
          filter: {exclude: true},
          items: {exclude: true},
          itemContent: {exclude: true, required: true},
          onclick: {key: 'ng-click'}
        };

        var elementHtml = '<md-list>' +
                            '<md-list-item transclude ' +
                                          'ng-repeat="item in ' + $tAttrs.items + ($tAttrs.filter ? ' | ' + $tAttrs.filter : '') + '" ' +
                                           attrUtil.toAttrString(attrUtil.handleAttrs($tEle, expectedAttrs, true)) +
                            '>' +
                              '{{ ' + $tAttrs.itemContent + ' }}' +
                            '</md-list-item>' +
                          '</md-list>';
        $tEle.html(elementHtml);
      }
    };
  }]);
