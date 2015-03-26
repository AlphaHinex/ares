'use strict';

angular.module('ares.form')

/**
 * @ngdoc directive
 * @name ares.directive:aresButton
 * @description
 * # aresButton
 */
.directive('aresButton', ['attrUtil', function(attrUtil) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E',
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    compile: function($tElement, $tAttrs) {
      var btnCommonStyle = 'btn ';
      var expectedAttrs = {
        text: {key: 'text', required: true, exclude: true},
        type: {
          key: 'class', 
          required: true,
          values: {
            defaultVal: btnCommonStyle + 'btn-default',
            submit: btnCommonStyle + 'btn-primary',
            back: btnCommonStyle + 'btn-warning',
            cancel: btnCommonStyle + 'btn-warning'
          }
        },
        href: {key: 'href', required: true, values: {defaultVal: ''}},
        disabled: {key: 'ng-class', exclude: true},
        onclick: {key: 'ng-click'}
        // More here to be implemented
      };

      var elementHtml = '<a ' +
                            attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                            ($tAttrs.disabled ? expectedAttrs.disabled.key + '="{disabled:' + $tAttrs.disabled + '}" ' : '') +
                        '>' + $tAttrs.text + '</a>';
      $tElement.html(elementHtml);

      return function() {
      };
    }
  };
}]);