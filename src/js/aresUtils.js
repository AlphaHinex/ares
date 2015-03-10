'use strict';

angular.module('ares.utils', [])

.factory('attrUtil', function() {
  return {

    /**
     * @ngdoc function
     * @description parse attributes defined in attrObjs 
     * and set them into the container which will be returned.
     * 
     * an attribute object should be defined in attrObjs like this:
     * 
     *     attrName: properties
     * 
     * and below property keys could be used:
     * 1. key: turn attribute name to key in final element html
     * 2. required: only mark this attribute is required, not translate to final element html
     * 3. exclude: attribute will not include in final element html if true
     * 4. nullable: attribute could without value if true
     * 5. values: defined by user except 'defaultVal' key
     * 
     * @example
     * attrObjs = {
     *   label: {key: 'label', required: true, exclude: true},
     *   type: {key: 'type', required: true},
     *   placeholder: {key: 'placeholder'},
     *   required: {key: 'required', nullable: true},
     *   term: {key: 'term', values: {defaultVal: ''}},
     *   dblBind: {key: 'ng-model', required: true}
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
      var attrContainer = {}, snakeCaseAttr, value, attrObj;
      for(var attr in attrObjs) {
        snakeCaseAttr = this.snakeCase(attr);
        attrObj = attrObjs[attr];
        value = ele.attr(snakeCaseAttr);
        if(this.needToHandle(attrObj, value)) {
          if(attrObj.nullable) {
            attrContainer[attrObj.key] = null;
          } else {
            attrContainer[attrObj.key] = value ? 
                                          this.hasDefinedInValues(attrObj, value) ? 
                                            attrObj.values[value] : 
                                            value :
                                          attrObj.values.defaultVal;
          }
        }
        if(removeAfterUse) {
          if(ele.removeAttr) {
            ele.removeAttr(snakeCaseAttr);
          } else if(element.removeAttr) {
            element.removeAttr(snakeCaseAttr);
          }
        }
      }
      return attrContainer;
    },

    hasDefinedInValues: function(attrObj, prop) {
      return attrObj.values && attrObj.values[prop]!==undefined;
    },

    needToHandle: function(attrObj, value) {
      return !this.noNeedToHandle(attrObj, value); 
    },

    noNeedToHandle: function(attrObj, value) {
      return attrObj.exclude || (value===undefined && !this.hasDefinedInValues(attrObj, 'defaultVal'));
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
        result += key + (value ? '="' + value + '" ' : ' '); 
      });
      return result;
    }

  };
})

.factory('beanUtil', function(){
  return {

    /**
     * @ngdoc function
     * @description remove entity in array by key which key is value
     * @param {array} array object array
     * @param {string} key key string
     * @param {object} value key value want to remove
     */
    remove: function(array, key, value) {
      for(var i=0, len=array.length; i<len; i++) {
          if(array[i][key] === value) {
              array.splice(i, 1);
              break;
          }
      }
    }
    
  };
});