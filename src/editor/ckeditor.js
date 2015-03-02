'use strict';

var deps = [
  // depends on angular-ckeditor.js https://github.com/lemonde/angular-ckeditor
  'ckeditor',
  'ares.utils'
];

angular.module('ares.ckeditor', deps)

.directive('aresCkeditor', ['attrUtil', function(attrUtil){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // template: '',
    // templateUrl: '',
    // transclude: true,
    restrict: 'E',
    // replace: true,
    compile: function($tElement, $tAttrs) {
      var expectedAttrs = {
        dblBind: {key: 'ng-model', values: {defaultVal: 'required'}}
        // More here to be implemented
      };

      var elementHtml = '<div ckeditor="ckOptions" ' +
                              attrUtil.toAttrString(attrUtil.handleAttrs($tAttrs, expectedAttrs)) +
                             '>' + 
                        '</div>';
      $tElement.html(elementHtml);

      return function($scope, $element, $attrs) {
        // get ckOptions from controller's scope if exists
        var ckOptions = $scope.ckOptions = $scope.ckOptions || {};
        ckOptions.language = 'zh-cn';
      };
    }
  };
}]);