'use strict';

var deps = [
  'ares.utils',
  'ui.grid', 
  'ui.grid.pagination', 
  'ui.grid.pinning',
  'ui.grid.moveColumns',
  'ui.grid.resizeColumns',
  'ui.grid.selection',
  'ui.grid.exporter'
];

/**
 * @ngdoc directive
 * @name ares.directive:aresGrid
 * @description
 * # aresGrid
 */
angular.module('ares.grid', deps)

.directive('aresGrid', ['i18nService', 'uiGridConstants', 'attrUtil', 'dateFilter', 'beanUtil', function(service, constants, attrUtil, dateFilter, beanUtil) {
  return {
    restrict: 'E',
    compile: function($tElement) {
      var colExpectedAttrs = {
        label: {key: 'name', values: {defaultVal: 'required'}},
        property: {key: 'field', values: {defaultVal: 'required'}},
        type: {
          key: 'cellFilter', 
          values: {
            defaultVal: '',
            date: 'date:"yyyy-MM-dd"',
            time: 'date:"HH:mm:ss"',
            timestamp: 'date:"yyyy-MM-dd HH:mm:ss"',
            string: ''
          }
        },
        enableMenu: {key: 'enableColumnMenu', values: {defaultVal: true, 'true': true, 'false': false}},
        enableSort: {key: 'enableSorting', values: {defaultVal: true, 'true': true, 'false': false}}
        // More here to be implemented
      };
      var cols = [];
      angular.forEach($tElement.find('ares-grid-col'), function(col) {
        col = angular.element(col);

        var obj = attrUtil.handleAttrs(col, colExpectedAttrs);
        obj.enableFiltering = false;

        var filterExpectedAttrs = {
          placeholder: {key: 'placeholder', values: {defaultVal: ''}},
          keywords: {key: 'term', values: {defaultVal: ''}},
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
        angular.forEach(col.find('ares-grid-col-filter'), function(f) {
          obj.enableFiltering = true;
          filters = obj.filters || [];
          filter = attrUtil.handleAttrs(f, filterExpectedAttrs);

          if(obj[colExpectedAttrs.type.key] && obj[colExpectedAttrs.type.key].indexOf('date:') === 0) {
            var format = obj[colExpectedAttrs.type.key].substring('date:'.length);
            var relation = filter[filterExpectedAttrs.pattern.key];
            filter[filterExpectedAttrs.pattern.key] = function(searchTerm, cellValue) {
              var a = searchTerm.replace(/\\/g, '');
              var b = dateFilter(cellValue, format.replace(/"/g, ''));
              return relation === constants.filter.EXACT ? a === b : 
                      relation === constants.filter.GREATER_THAN ? a < b :
                        relation === constants.filter.GREATER_THAN_OR_EQUAL ? a <= b :
                          relation === constants.filter.LESS_THAN ? a > b :
                            relation === constants.filter.LESS_THAN_OR_EQUAL ? a >= b :
                              relation === constants.filter.NOT_EQUAL ? a !== b : false;
            };
          }

          filters.push(filter);
          obj.filters = filters;
          f.remove();
        });

        // handle content of ares-grid-col tag
        if(col.html().trim()) {
          obj.cellTemplate = col.html();
        }

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

      return function($scope) {
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

        // add common remove data by id from grid to parent scope
        $scope.$parent.removeGridData = function(key, value) {
          beanUtil.remove(gridOptions.data, key, value);
        };
      };
    }
  };
}]);