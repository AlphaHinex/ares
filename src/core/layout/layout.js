'use strict';

angular.module('ares.core.layout', ['ngMaterial'])

  /**
   * @ngdoc directive
   * @name ares.directive:aresLayout
   * @description
   * # aresLayout
   */
  .directive('aresLayout', [function() {
    return {
      restrict: 'E',
      template: '<div layout ng-transclude></div>',
      replace: true,
      transclude: true
    };
  //}])
  //
  ///**
  // * @ngdoc directive
  // * @name ares.directive:aresPadding
  // * @description
  // * # aresPadding
  // */
  //.directive('aresPadding', [function() {
  //  return {
  //    restrict: 'A',
  //
  //  };
  }]);
