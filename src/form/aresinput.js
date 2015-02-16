'use strict';

/**
 * @ngdoc directive
 * @name aresApp.directive:aresInput
 * @description
 * # aresInput
 */
angular.module('ares.input', [])

.directive('aresInput', [function() {
  return {
    restrict: 'E',
    require: '^form',
    scope: true,
    compile: function($element, $attrs) {
      var expectedInputAttrs = {
        'required': 'required',
        'ng-maxlength': 'ngMaxlength'
          // More here to be implemented
      };

      // Start extracting content from the HTML
      var validationKeys = $element.find('validation');
      var presentValidationKeys = {};
      angular.forEach(validationKeys, function(validationKey) {
        validationKey = angular.element(validationKey);
        presentValidationKeys[validationKey.attr('key')] =
          validationKey.text();
      });

      // add default error message if not set by validation tag
      if ($attrs.ngMaxlength !== undefined && presentValidationKeys.maxlength === undefined) {
        presentValidationKeys.maxlength = '不能输入超过' + $attrs.ngMaxlength + '个字符';
      }

      // Start generating final element HTML
      var inputName = $attrs.name;
      var elementHtml = '<div class="form-group">' +
        '<label>' + $attrs.label + '</label>';
      elementHtml += '<input type="' + $attrs.type +
        '" name="' + inputName +
        '" ng-model="' + $attrs.bindTo +
        '" class="form-control" ' +
        'placeholder="' + $attrs.placeholder + '"';

      $element.removeAttr('label');
      $element.removeAttr('type');
      $element.removeAttr('name');
      $element.removeAttr('bind-to');
      $element.removeAttr('placeholder');

      for (var i in expectedInputAttrs) {
        if ($attrs[expectedInputAttrs[i]] !== undefined) {
          elementHtml += ' ' + i + '="' +
            $attrs[expectedInputAttrs[i]] + '"';
        }
        $element.removeAttr(i);
      }
      elementHtml += '>';

      elementHtml +=
        '<span ng-repeat="(key, text) in validators" ' +
        ' ng-show="hasError(key)"' +
        ' ng-bind="text"' + 
        ' class="ares-err-msg"></span>';

      elementHtml += '</div>';
      $element.html(elementHtml);

      return function($scope, $element, $attrs, formCtrl) {
        // set validate result to $scope
        $scope.validators = angular.copy(presentValidationKeys);
        $scope.hasError = function(key) {
          var err = formCtrl[inputName].$error; 
          return !!err[key];
        };
      };
    }
  };
}]);