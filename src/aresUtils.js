'use strict';

angular.module('ares.utils', [])

.factory('attrUtil', function() {
  return {

    /**
     * @ngdoc function
     * @description parse attributes defined in attrObjs 
     * and set them into the container which will be returned.
     * 
     * ares defined format for attrObjs is like this:
     * attrObjs = {
     *   placeholder: {key: 'placeholder', values: {defaultVal: ''}},
     *   term: {key: 'term', values: {defaultVal: ''}},
     *   pattern: {
     *     key: 'condition', 
     *     values: {
     *       defaultVal: constants.filter.CONTAINS, 
     *       like: constants.filter.CONTAINS, 
     *       eq: constants.filter.EXACT, 
     *       gt: constants.filter.GREATER_THAN, 
     *       ge: constants.filter.GREATER_THAN_OR_EQUAL, 
     *       lt: constants.filter.LESS_THAN, 
     *       le: constants.filter.LESS_THAN_OR_EQUAL, 
     *       neq: constants.filter.NOT_EQUAL
     *     }
     *   }
     * }
     * 
     * @param {object} element html element or it's string
     * @param {object} attrObjs attribute objects with ares defined format
     * @param {boolean} removeAfterUse remove attribute after used, default false
     * @returns {object} attributes container used by customer
     */
    handleAttrs: function(element, attrObjs, removeAfterUse) {
      var ele = angular.element(element);
      var attrContainer = {}, value, attrObj;
      for(var attr in attrObjs) {
        value = ele.attr(this.snakeCase(attr));
        attrObj = attrObjs[attr];
        attrContainer[attrObj.key] = value ? (attrObj.values[value] ? attrObj.values[value] : value) : attrObj.values.defaultVal;
        if(removeAfterUse) {
          if(ele.removeAttr) {
            ele.removeAttr(this.snakeCase(attr));
          } else if(element.removeAttr) {
            element.removeAttr(this.snakeCase(attr));
          }
        }
      }
      return attrContainer;
    },

    /**
     * @ngdoc function
     * @description borrowed from angular.js private method
     * turn camel case name to snake case with separator or default
     * @param {string} name camel case string
     * @param {string} separator separator used by snake case, '-' by default
     * @return {string} snake case name separated by separator
     */
    snakeCase: function(name, separator) {
      separator = separator || '-';
      var SNAKE_CASE_REGEXP = /[A-Z]/g;
      return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
      });
    },

    /**
     * @ngdoc function
     * @description turn attribute container to string used by html element
     * attribute container could get from handleAttrs method
     * @param {object} attrContainer attribute container
     * @return {string} string with attributes that could include in html element string
     */
    toAttrString: function(attrContainer) {
      var result = '';
      angular.forEach(attrContainer, function(value, key) {
        result += key + '="' + value + '" '; 
      });
      return result;
    }

  };
});