'use strict';

angular.module('template/tree/main.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/tree/main.html',
    '<li>\n' +
    '  <span ng-click="treeOptions.onSwitchClick(node);" ' +
    '        ng-class="{\'ares-minus\': (node.children||node.hasChildren)&&node.open, ' + 
    '                   \'ares-plus\': (node.children||node.hasChildren)&&!node.open, ' + 
    '                   \'ares-loading\': node.loading, ' +
    '                   \'ares-right-open\': !node.children&&!node.hasChildren}">' + 
    '  </span>\n' +
    '  <a ng-click="treeOptions.onNodeClick(node)">\n' +
    '    <span ng-class="{\'ares-folder-open\': (node.children||node.hasChildren)&&node.open, ' + 
    '                     \'ares-folder\': (node.children||node.hasChildren)&&!node.open, ' + 
    '                     \'ares-file\': !node.children&&!node.hasChildren}">' +
    '    </span>\n' +
    '    <span ng-bind="node.name"></span>\n' +
    '  </a>\n' +
    '  <ul ng-include="\'template/tree/main.html\'" ng-repeat="node in node.children | filter:{visible:true}"></ul>\n' +
    '</li>\n' +
    '');
}]);

angular.module('template/tree/tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/tree/tpl.html',
    '<div class="aresTree">\n' +
    '  <ul ng-include="\'template/tree/main.html\'" ng-repeat="node in treeOptions.treeModel | filter:{visible:true}"></ul>\n' + 
    '</div>\n' +
    '');
}]);