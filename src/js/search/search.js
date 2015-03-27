'use strict';

var deps = [
  'ares.utils',
  'ui.bootstrap'
];

angular.module('ares.search', deps)

.directive('aresSearchCond', ['attrUtil', function(attrUtil){
  return {
    restrict: 'E',
    compile: function($tElement) {
      var expectedAttrs = {
        dblBind: {key: 'ng-model', required: true},
        label: {key: 'tooltip'},
        placeholder: {key: 'placeholder'},
        type: {
          key: 'type', 
          required: true,
          values: {
            defaultVal: 'text',
            text: 'text',
            date: 'date',
            timestamp: 'datetime-local'
          }
        }
        // More here to be implemented
      };

      var elementHtml = '<div class="col-md-4">' +
                        '  <div class="input-group">' +
                        '    <input class="form-control input-sm" ' +
                                    attrUtil.toAttrString(attrUtil.handleAttrs($tElement, expectedAttrs, true)) +
                        '    >' + 
                        '    <span class="input-group-btn">' + 
                        '      <button class="btn btn-default" type="button">' + 
                        '        <span class="ares-search"></span>'
                        '      </button>' +
                        '    </span>' +
                        '  </div>' +
                        '</div>';
      $tElement.html(elementHtml);

      return function() { };
    }
  };
}]);