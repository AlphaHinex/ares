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

      var modifyChildrenVisible = function(node) {
        angular.forEach(node.children, function(child) {
          child.visible = node.visible && node.open;
          modifyChildrenVisible(child);
        });
      };

      var preHandle = function(simpleNodes) {
        var map = [];
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

        angular.forEach(nodes, function(node) {
          if(node.open) {
            modifyChildrenVisible(node);
          }
        });
      };

      var treeOptions = $scope.treeOptions;
      if(treeOptions && !treeOptions.nodes && treeOptions.async) {
        treeOptions.async()
          .then(function(children) {
            preHandle(children);
          });
      } else {
        preHandle(treeOptions.nodes);
      }

      var doSwitchClickLogic = function(node) {
        if(node.open) {
          if(treeOptions && treeOptions.onCollapse) {
            treeOptions.onCollapse(node);
          }
        } else {
          if(treeOptions && treeOptions.onExpand) {
            treeOptions.onExpand(node);
          }
        }
        node.open = !node.open;
        modifyChildrenVisible(node);
      };
      $scope.onSwitchClick = function(node) {
        if(!node.children && !node.hasChildren) {
          return;
        }
        if(!node.open && !node.children && treeOptions && treeOptions.async) {
          node.loading = true;
          treeOptions.async(node)
            .then(function(children) {
              node.children = node.children || [];
              angular.forEach(children, function(child) {
                child.parent = node;
                node.children.push(child);
              });
            })
            .then(function() {
              node.loading = false;
              doSwitchClickLogic(node);
            });
        } else {
          doSwitchClickLogic(node);
        }
      };

      $scope.onNodeClick = function(node) {
        if(treeOptions && treeOptions.onClick) {
          treeOptions.onClick(node);
        }
      };
    }
  };
});