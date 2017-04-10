angular.module('DirFixa', [])
.directive('menuFixo', function() {

  var ddo = {};

  ddo.restrict = "AE";

  ddo.templateUrl = 'directives/menuFixo.html';

  return ddo;
})
