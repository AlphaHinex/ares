'use strict';

angular.module('ares.components.sidenav', ['ngMaterial'])

/**
 * @ngdoc directive
 * @name ares.directive:aresSidenav
 * @description
 * # aresSidenav
 */
  .directive('aresSidenav', ['attrUtil', function(attrUtil) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      compile: function($tEle) {
        var commonClass = 'md-whiteframe-z2 '
        var expectedAttrs = {
          position: {
            key: 'class',
            values: {
              defaultVal: commonClass + 'md-sidenav-left',
              left: commonClass + 'md-sidenav-left'
            }
          },
          id: {
            key: 'md-component-id'
          }
        };

        var elementHtml = '<md-sidenav ng-transclude ' +
                                       attrUtil.toAttrString(attrUtil.handleAttrs($tEle, expectedAttrs, true)) +
                          '>' +
                          '</md-sidenav>';
        $tEle.html(elementHtml);
      }
    };
  }]);
