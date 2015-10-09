'use strict';

angular.module('ares.core.layout', ['ngMaterial'])

  /**
   * @ngdoc directive
   * @name ares.directive:aresLayout
   * @description
   * # aresLayout
   */
  .directive('aresLayout', ['attrUtil', function(attrUtil) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      compile: function($tEle) {
        var expectedAttrs = {
          dir: {
            key: 'layout',
            values: {
              defaultVal: 'row',
              h: 'row',
              v: 'column'
            }
          }
        };

        var elementHtml = '<div ng-transclude ' +
                                attrUtil.toAttrString(attrUtil.handleAttrs($tEle, expectedAttrs, true)) +
                                '>' +
                          '</div>';
        $tEle.html(elementHtml);
      }
    };
  }])

  /**
   * @ngdoc directive
   * @name ares.directive:aresPadding
   * @description
   * # aresPadding
   */
  .directive('aresPadding', [function() {
    return {
      restrict: 'A',
      link: function($scope, $ele, $attrs) {
        $ele.addClass('flex');
        if ($attrs.aresPadding) {
          $ele.addClass('flex-' + $attrs.aresPadding);
        }
        $ele.removeAttr('ares-padding');
      }
    };
  }]);
