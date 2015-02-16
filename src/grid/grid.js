'use strict';

var deps = [
  'ui.grid', 
  'ui.grid.pagination', 
  'ui.grid.pinning',
  'ui.grid.moveColumns',
  'ui.grid.resizeColumns',
  'ui.grid.selection',
  'ui.grid.exporter'
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
      var colExpectedAttrs = {
        'label': 'name',
        'property': 'field',
        'type': 'type'  // valid values: date, time, timestamp, string(default)
        // More here to be implemented
      };
      var cols = [];
      angular.forEach($tElement.find('ares-grid-col'), function(col) {
        col = angular.element(col);
        console.log(col.attr('label'));
        var obj = {};
        for(var attr in colExpectedAttrs) {
          if(attr === 'type') {
            if('timestamp' === col.attr(attr)) {
              obj.cellFilter = 'date:"yyyy-MM-dd HH:mm:ss';
            } else if('time' === col.attr(attr)) {
              obj.cellFilter = 'date:"HH:mm:ss"';
            } else if('date' === col.attr(attr)) {
              obj.cellFilter = 'date:"yyyy-MM-dd"';
            }
          } else {
            obj[col.attr(attr)] = col.attr(attr);
          }
        }
      });
      
      var elementHtml = '<div ui-grid="gridOptions" ' +
                             'ui-grid-pagination ' + 
                             'ui-grid-pinning ' + 
                             'ui-grid-move-columns ' + 
                             'ui-grid-resize-columns ' + 
                             'ui-grid-selection ' + 
                             'ui-grid-exporter ' + 
                             '>' + 
                        '</div>';
      $tElement.html(elementHtml);

      return function($scope, $element, $attrs) {
        service.setCurrentLang('zh-cn');

        // get gridOptions from controller's scope if exists
        var gridOptions = $scope.gridOptions = $scope.gridOptions || {};
        gridOptions.paginationPageSizes = [25, 50, 75, 100];
        gridOptions.paginationPageSize = 25;
        gridOptions.useExternalPagination = true;
        gridOptions.useExternalSorting = true;
        gridOptions.enableGridMenu = true;
        gridOptions.exporterMenuPdf = false;
        gridOptions.colDefs = cols;

        gridOptions.onRegisterApi = function(gridApi) {
          $scope.gridApi = gridApi;

          gridApi.pagination.on.paginationChanged($scope, function(currentPage, pageSize) {
            $scope.getPage(currentPage, pageSize);
          });

          gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
            $scope.getPage(grid.options.paginationCurrentPage, grid.options.paginationPageSize, sortColumns);
          });

          gridApi.exporter.on.exportAll($scope, function() {
            $scope.exportAll();
            gridOptions.useExternalPagination = false;
            gridOptions.useExternalSorting = false;
            $scope.getPage = function() { };
          });
        };

        if($scope.getPage) {
          $scope.getPage(1, gridOptions.paginationPageSize);
        }
      }
    }
  };
}]);