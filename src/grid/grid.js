'use strict';

angular.module('ares.grid', ['ui.grid'])

.directive('aresGrid', ['', function(){
    // Runs during compile
    return {
        restrict: 'E',
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        compile: function($tElement, $tAttrs) {
            var elementHtml = '<div ui-grid="{ data: gridData }" class="grid"></div>';
            $tElement.html(elementHtml);

            return function($scope, $element, $attrs){

            }
        }
    };
}]);