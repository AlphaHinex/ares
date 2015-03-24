'use strict';

angular.module('ares.tree')

.directive('aresTree', function(){
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
      var treeOptions = $scope.treeOptions || {};
      var treeModel = treeOptions.treeModel = [];
      // Map<nodeId, nodeObject>
      var treeMap = treeOptions.treeMap = [];

      var modifyChildrenVisible = function(node) {
        angular.forEach(node.children, function(child) {
          child.visible = node.visible && node.open;
          modifyChildrenVisible(child);
        });
      };

      /**
       * @ngdoc function
       * @description Pre-handle simple nodes to tree model.
       * 
       * Simple nodes supplied by $scope.treeOptions.nodes, 
       * or use $scope.treeOptions.async function to supply initial simple nodes
       * A simple node is like this: 
       * { id: 1, pId: 0, name: 'demo', open: true|false, hasChildren: true|false }
       * 
       * Tree model is a node object list, node object extends simple node with some properties.
       * A node object is like this:
       * { 
       *   id: 1, pId: 0, name: 'demo', open: true, hasChildren: true,
       *   parent: parentNode, children: childrenNodes,
       *   visible: true|false, loading: true:false
       * }
       *
       * Pre-handle function do things as below:
       * 1. adds node object to the tree map, which is a node id and node object map
       * 2. extends simple node to node object
       * 3. adds root level node object to tree model
       * 4. refreshes the visible of root level node objects' children
       * 
       * @param {Array} nodes simple nodes array
       */ 
      var preHandle = function(nodes) {
        angular.forEach(nodes, function(node) {
          treeMap[node.id] = node;
        });
        angular.forEach(nodes, function(node) {
          var parentNode = treeMap[node.pId];
          if(parentNode) {
            parentNode.children = parentNode.children || [];
            parentNode.children.push(node);
            node.parent = parentNode;
          } else {
            node.visible = true;
            treeModel.push(node);
          }
        });

        angular.forEach(treeModel, function(node) {
          if(node.open) {
            modifyChildrenVisible(node);
          }
        });
      };

      // initial tree model
      if(!treeOptions.nodes && treeOptions.async) {
        treeOptions.async()
          .then(function(children) {
            preHandle(children);
          });
      } else {
        preHandle(treeOptions.nodes);
      }

      treeOptions.addChildrenToId = function(pId, children) {
        addChildrenToNode(treeMap[pId], children);
      };

      var addChildrenToNode = function(parent, children) {
        parent.children = parent.children || [];
        angular.forEach(children, function(child) {
          child.parent = parent;
          parent.children.push(child);
          child.visible = parent.visible && parent.open;
          treeMap[child.id] = child;
        });
      };

      var doSwitchClickLogic = function(node) {
        if(node.open) {
          if(treeOptions.onCollapse) {
            treeOptions.onCollapse(node);
          }
        } else {
          if(treeOptions.onExpand) {
            treeOptions.onExpand(node);
          }
        }
        node.open = !node.open;
        modifyChildrenVisible(node);
      };
      treeOptions.onSwitchClick = function(node) {
        if(!node.children && !node.hasChildren) {
          return;
        }
        if(!node.open && !node.children && treeOptions.async) {
          node.loading = true;
          treeOptions.async(node)
            .then(function(children) {
              addChildrenToNode(node, children);
            })
            .then(function() {
              node.loading = false;
              doSwitchClickLogic(node);
            });
        } else {
          doSwitchClickLogic(node);
        }
      };

      treeOptions.onNodeClick = function(node) {
        if(treeOptions.onClick) {
          treeOptions.onClick(node);
        }
      };
    }
  };
});