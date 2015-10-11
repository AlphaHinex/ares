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
        var btnStyle = $tAttrs.level ? ' md-' + $tAttrs.level : '';
        var expectedAttrs = {
          icon: {
            key: 'md-svg-src',
            exclude: true,
            values: {
              defaultVal: '',
              search: '/src/components/icons/img/ic_search_black_18px.svg'
            }
          },
          iconStyle: {
            key: 'style',
            exclude: true
          },
          level: {
            exclude: true,
            values: {
              defaultVal: '',
              primary: ' md-primary',
              warn: ' md-warn'
            }
          },
          text: {key: 'text', exclude: true},
          title: {key: 'title'},
          type: {
            key: 'class',
            required: true,
            values: {
              defaultVal: 'md-icon-button' + btnStyle,
              icon: 'md-icon-button' + btnStyle,
              text: 'md-raised' + btnStyle
            }
          },
          //href: {key: 'href', required: true, values: {defaultVal: ''}},
          disabled: {key: 'ng-class', exclude: true},
          onclick: {key: 'ng-click'}
          // More here to be implemented
        };

        var elementHtml = '<md-button ' + attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                          '           aria-label="' + ($tAttrs.title || $tAttrs.text || 'none') + '" ' +
                          '>' +
                            ($tAttrs.icon ? '<md-icon ' + expectedAttrs.icon.key + '="' + expectedAttrs.icon.values[$tAttrs.icon] + '" ' +
                                                      ($tAttrs.iconStyle ?  expectedAttrs.iconStyle.key + '="' + $tAttrs.iconStyle + '"' : '') +
                                            '></md-icon>' : '') +
                            ($tAttrs.text ? $tAttrs.text : '') +
                          '</md-button>';
        $tElement.html(elementHtml);
      }
    };
  }]);
