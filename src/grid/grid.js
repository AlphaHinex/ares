'use strict';

var deps = [
  'ui.grid', 
  'ui.grid.pagination', 
  'ui.grid.pinning',
  'ui.grid.moveColumns',
  'ui.grid.resizeColumns'
];

angular.module('ares.grid', deps)

.directive('aresGrid', ['i18nService', function(service) {
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
      var elementHtml = '<div ui-grid="gridOptions" ' +
                             'ui-grid-pagination ' + 
                             'ui-grid-pinning ' + 
                             'ui-grid-move-columns ' + 
                             'ui-grid-resize-columns ' + 
                             '>' + 
                        '</div>';
      $tElement.html(elementHtml);

      return function($scope, $element, $attrs) {
        service.setCurrentLang('zh-cn');

        $scope.gridOptions = $scope.gridOptions || {};
        $scope.gridOptions.paginationPageSizes = [25, 50, 75, 100];
        $scope.gridOptions.paginationPageSize = 25;
      }
    }
  };
}]);