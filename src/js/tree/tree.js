'use strict';

angular.module('ares.tree')

.directive('aresTree', function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E',
    // template: template,
    templateUrl: 'template/tree/tpl.html',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope) {
      var nodes = $scope.nodes = [];

      var simpleNodes = $scope.treeOptions.nodes, map = [];
      angular.forEach(simpleNodes, function(node) {
        map[node.id] = node;
      });
      angular.forEach(simpleNodes, function(node) {
        var parentNode = map[node.pId];
        if(parentNode) {
          parentNode.children = parentNode.children || [];
          parentNode.children.push(node);
          node.parent = parentNode;
        } else {
          node.visible = true;
          nodes.push(node);
        }
      });

      var modifyChildrenVisible = function(node) {
        angular.forEach(node.children, function(child) {
          child.visible = node.visible && node.open;
          modifyChildrenVisible(child);
        });
      };
      angular.forEach(nodes, function(node) {
        if(node.open) {
          modifyChildrenVisible(node);
        }
      });

      var doSwitchClickLogic = function(node) {
        if(node.open) {
          if($scope.treeOptions && $scope.treeOptions.onCollapse) {
            $scope.treeOptions.onCollapse(node);
          }
        } else {
          if($scope.treeOptions && $scope.treeOptions.onExpand) {
            $scope.treeOptions.onExpand(node);
          }
        }
        node.open = !node.open;
        modifyChildrenVisible(node);
      };
      $scope.onSwitchClick = function(node) {
        if(!node.children && !node.hasChildren) {
          return;
        }
        if(!node.open && !node.children && $scope.treeOptions && $scope.treeOptions.async) {
          $scope.treeOptions.async(node)
            .then(function(children) {
              node.children = node.children || [];
              angular.forEach(children, function(child) {
                child.parent = node;
                node.children.push(child);
              });
            })
            .then(function() {
              doSwitchClickLogic(node);
            });
        } else {
          doSwitchClickLogic(node);
        }
      };

      $scope.onNodeClick = function(node) {
        if($scope.treeOptions && $scope.treeOptions.onClick) {
          $scope.treeOptions.onClick(node);
        }
      };
    }
  };
});