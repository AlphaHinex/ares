'use strict';

angular.module('ares.components.toolbar', ['ngMaterial'])

  /**
   * @ngdoc directive
   * @name ares.directive:aresToolbar
   * @description
   * # aresToolbar
   */
  .directive('aresToolbar', [function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<md-toolbar class="md-toolbar-tools" ng-transclude></md-toolbar>'
    };
  }]);
