'use strict';

var configIconProvider = function($mdIconProvider) {
  $mdIconProvider.defaultIconSet('./sprite.svg');
};

angular.module('ares.components.icons', ['ngMaterial']).config(configIconProvider);
