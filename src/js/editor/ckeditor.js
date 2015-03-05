'use strict';

var deps = [
  // depends on angular-ckeditor.js https://github.com/lemonde/angular-ckeditor
  'ckeditor',
  'ares.utils'
];

angular.module('ares.ckeditor', deps)

.directive('aresCkeditor', ['attrUtil', function(attrUtil){
  return {
    restrict: 'E',
    compile: function($tElement) {
      var expectedAttrs = {
        dblBind: {key: 'ng-model', values: {defaultVal: 'required'}}
        // More here to be implemented
      };

      var elementHtml = '<div ckeditor="ckOptions" ' +
                              attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                             '>' + 
                        '</div>';
      $tElement.html(elementHtml);

      return function($scope) {
        // get ckOptions from controller's scope if exists
        var ckOptions = $scope.ckOptions = $scope.ckOptions || {};
        ckOptions.language = 'zh-cn';
      };
    }
  };
}]);