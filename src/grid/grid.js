'use strict';

var deps = [
  'ares.factory',
  'ui.grid', 
  'ui.grid.pagination', 
  'ui.grid.pinning',
  'ui.grid.moveColumns',
  'ui.grid.resizeColumns',
  'ui.grid.selection',
  'ui.grid.exporter'
];

angular.module('ares.grid', deps)

.directive('aresGrid', ['i18nService', 'uiGridConstants', 'attrFactory', function(service, constants, attrFactory) {
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
        label: 'name',
        property: 'field',
        type: 'type',  // valid values: date, time, timestamp, string(default)
        enableMenu: 'enableColumnMenu', // valid values: true(default), false
        enableSort: 'enableSorting'  // valid values: true(default), false
        // More here to be implemented
      };
      var cols = [];
      angular.forEach($tElement.find('ares-grid-col'), function(col) {
        var obj = {};
        col = angular.element(col);

        // handle properties of ares-grid-col tag
        var value;
        var regEx = new RegExp('^enable');
        for(var attr in colExpectedAttrs) {
          value = col.attr(attr);
          if(attr === 'type') {
            if('timestamp' === value) {
              obj.cellFilter = 'date:"yyyy-MM-dd HH:mm:ss"';
            } else if('time' === value) {
              obj.cellFilter = 'date:"HH:mm:ss"';
            } else if('date' === value) {
              obj.cellFilter = 'date:"yyyy-MM-dd"';
            }
          } else if(value) {
            obj[colExpectedAttrs[attr]] = regEx.test(attr) ? value==='true' : value;
          }
        }

        var filterExpectedAttrs = {
          placeholder: {key: 'placeholder', values: {defaultVal: ''}},
          term: {key: 'term', values: {defaultVal: ''}},
          pattern: {
            key: 'condition', 
            values: {
              defaultVal: constants.filter.CONTAINS, 
              like: constants.filter.CONTAINS, 
              eq: constants.filter.EXACT, 
              gt: constants.filter.GREATER_THAN, 
              ge: constants.filter.GREATER_THAN_OR_EQUAL, 
              lt: constants.filter.LESS_THAN, 
              le: constants.filter.LESS_THAN_OR_EQUAL, 
              neq: constants.filter.NOT_EQUAL
            }
          }
          // More here to be implemented
        };
        // handle filters
        var filters, filter;
        obj.enableFiltering = false;
        angular.forEach(col.find('ares-grid-col-filter'), function(f) {
          obj.enableFiltering = true;
          filters = obj.filters || [];
          filter = attrFactory.handleAttrs(f, filterExpectedAttrs);

          // for(var attr in filterExpectedAttrs) {
          //   value = f.attr(attr);
          //   attrObj = filterExpectedAttrs[attr];
          //   filter[attrObj.key] = value ? (attrObj.values[value] ? attrObj.values[value] : value) : attrObj.values.defaultVal;
          // }

          filters.push(filter);
          obj.filters = filters;
          f.remove();
        });

        // handle content of ares-grid-col tag
        obj.cellTemplate = col.html();

        cols.push(obj);
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
        gridOptions.enableFiltering = true;
        gridOptions.useExternalPagination = true;
        gridOptions.useExternalSorting = true;
        gridOptions.enableGridMenu = true;
        gridOptions.exporterMenuPdf = false;
        gridOptions.columnDefs = cols;

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
      };
    }
  };
}]);