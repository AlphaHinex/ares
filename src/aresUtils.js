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
     * @returns {object} attributes container used by customer
     */
    handleAttrs: function(element, attrObjs) {
      var ele = angular.element(element);
      var attrContainer = {}, value, attrObj;
      for(var attr in attrObjs) {
        value = ele.attr(attr);
        attrObj = attrObjs[attr];
        attrContainer[attrObj.key] = value ? (attrObj.values[value] ? attrObj.values[value] : value) : attrObj.values.defaultVal;
      }
      return attrContainer;
    }

  };
});