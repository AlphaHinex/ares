'use strict';

angular.module('ares.form')

/**
 * @ngdoc directive
 * @name ares.directive:aresInput
 * @description
 * # aresInput
 */
.directive('aresInput', ['attrUtil', function(attrUtil) {
  return {
    restrict: 'E',
    require: '^form',
    scope: true,
    compile: function($tElement, $tAttrs) {
      var expectedAttrs = {
        label: {key: 'label', required: true, exclude: true},
        type: {key: 'type', required: true},
        name: {key: 'name', required: true},
        dblBind: {key: 'ng-model', required: true},
        placeholder: {key: 'placeholder'},
        required: {key: 'required', nullable: true},
        maxlength: {key: 'ngMaxlength'}
        // More here to be implemented
      };

      // handle validation elements
      var validations = $tElement.find('validation');
      var presentValidations = {};
      angular.forEach(validations, function(validation) {
        validation = angular.element(validation);
        presentValidations[validation.attr('key')] = validation.text();
      });

      // add default error message if not set by validation tag
      if ($tAttrs.maxlength && !(presentValidations.maxlength)) {
        presentValidations.maxlength = '不能输入超过' + $tAttrs.maxlength + '个字符';
      }

      // Start generating final element HTML
      var inputName = $tAttrs.name;
      var elementHtml = '<div class="form-group">' +
                          '<label class="col-sm-1 control-label">' + $tAttrs.label + '</label>' + 
                          '<div class="col-sm-11">' + 
                            '<input class="form-control" ' + 
                                    attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                            '>' + 
                            '<span ng-repeat="(key, text) in validators" ' +
                                  'ng-show="hasError(key)" ' +
                                  'ng-bind="text" ' + 
                                  'class="ares-err-msg">' + 
                            '</span>' + 
                          '</div>' +
                        '</div>';
      $tElement.html(elementHtml);

      return function($scope, $element, $attrs, formCtrl) {
        // set validate result to $scope
        $scope.validators = angular.copy(presentValidations);
        $scope.hasError = function(key) {
          var err = formCtrl[inputName].$error; 
          return !!err[key];
        };
      };
    }
  };
}]);