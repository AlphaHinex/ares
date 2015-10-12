'use strict';

angular.module('ares.core.ngview', ['ngMaterial'])

  /**
   * @ngdoc directive
   * @name ares.directive:aresNgview
   * @description
   * # aresNgview
   */
  .directive('aresNgview', [function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: 'element',
      template: '<md-content ng-view flex layout-padding></md-content>'
    };
  }]);
