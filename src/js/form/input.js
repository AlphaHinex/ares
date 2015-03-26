'use strict';

angular.module('ares.form')

/**
 * @ngdoc directive
 * @name ares.directive:aresInput
 * @description
 * # aresInput
 */
.directive('aresInput', ['attrUtil', function(attrUtil) {

  var isTextarea = function(attrs){
    return attrs.type === 'textarea';
  };

  return {
    restrict: 'E',
    require: '^form',
    scope: true,
    replace: true,
    compile: function($tElement, $tAttrs) {
      var expectedAttrs = {
        label: {key: 'label', required: true, exclude: true},
        type: {
          key: 'type', 
          required: true,
          values: {
            defaultVal: 'text',
            text: 'text',
            date: 'date',
            timestamp: 'datetime-local',
            textarea: 'textarea'
          }
        },
        name: {key: 'name', required: true},
        dblBind: {key: 'ng-model', required: true},
        placeholder: {key: 'placeholder'},
        required: {key: 'required', nullable: true},
        maxlength: {key: 'ng-maxlength'}
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
      var elementName = $tAttrs.name;
      var mainElementHtml = '<input class="form-control input-sm" ';
      if(isTextarea($tAttrs)) {
        mainElementHtml = '<textarea class="form-control" rows="3" ';
        delete expectedAttrs.type.values.textarea;
      }
      var elementHtml = '<div class="form-group">' +
                          '<label class="col-md-1 control-label text-nowrap">' + $tAttrs.label + '</label>' + 
                          '<div class="col-md-5">' + 
                            mainElementHtml + 
                              attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                            '>' + 
                            (isTextarea($tAttrs) ? '</textarea>' : '') + 
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
          var err = formCtrl[elementName].$error; 
          return !!err[key];
        };
      };
    }
  };
}]);