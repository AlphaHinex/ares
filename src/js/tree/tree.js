'use strict';

/* global $:true */

angular.module('ares.tree', [])

.directive('aresTree', ['attrUtil', function(attrUtil){
  return {
    restrict: 'E',
    compile: function($tElement, $tAttr) {
      var expectedAttrs = {
        id: {key: 'id', required: true},
        // More here to be implemented
      };

      var asyncAttrs = {
        async: {key: 'enable', values: {defaultVal: true, 'true': true, 'false': false}},
        url: {key: 'url'}
        // More here to be implemented
      };

      var elementId = $tAttr[expectedAttrs.id.key];
      var elementHtml = '<ul class="ztree" ' +
                             attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                        '>' + 
                        '</ul>';
      $tElement.html(elementHtml);

      return function($scope) {
        // get treeOptions from (parent) controller's scope if exists
        var treeOptions = $scope.treeOptions = $scope.treeOptions || {};

        treeOptions.settings = {
          data: {
            simpleData: {
              enable: true
            }
          }, 
          callback: {
            onExpand: treeOptions.onExpand,
            onClick: treeOptions.onClick
          }
        };
        var asyncSettings = attrUtil.handleAttrs($tElement, asyncAttrs, true);
        if(asyncSettings && asyncSettings[asyncAttrs.async.key]) {
          treeOptions.settings.async = asyncSettings;
          treeOptions.settings.async.autoParam = ['id'];
        }

        $.fn.zTree.init($('#' + elementId), treeOptions.settings, treeOptions.nodes);
      };
    }
  };
}]);