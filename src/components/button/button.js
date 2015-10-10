'use strict';

angular.module('ares.components.button', ['ngMaterial'])

/**
 * @ngdoc directive
 * @name ares.directive:aresButton
 * @description
 * # aresButton
 */
  .directive('aresButton', ['attrUtil', function(attrUtil) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      compile: function($tElement, $tAttrs) {
        var expectedAttrs = {
          icon: {
            key: 'md-svg-icon',
            exclude: true,
            values: {
              defaultVal: '',
              search: '/src/components/icons/img/ic_search_black_18px.svg'
            }
          },
          text: {key: 'text', exclude: true},
          title: {key: 'title'},
          type: {
            key: 'class',
            required: true,
            values: {
              defaultVal: 'md-icon-button',
              icon: 'md-icon-button'
            }
          },
          //href: {key: 'href', required: true, values: {defaultVal: ''}},
          disabled: {key: 'ng-class', exclude: true},
          onclick: {key: 'ng-click'}
          // More here to be implemented
        };

        var elementHtml = '<md-button ' + attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                          '>' +
                            ($tAttrs.icon ? '<md-icon ' + expectedAttrs.icon.key + '="' + expectedAttrs.icon.values[$tAttrs.icon] + '"></md-icon>' : '') +
                            ($tAttrs.text ? $tAttrs.text : '') +
                          '</md-button>';
        $tElement.html(elementHtml);
      }
    };
  }]);
