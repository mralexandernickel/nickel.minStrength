(function() {
  var MinStrengthDirective;

  MinStrengthDirective = function($parse) {
    var directive;
    return directive = {
      require: "?ngModel",
      restrict: "A",
      link: function(scope, elem, attrs, ctrl) {
        var getMinStrengthValue, minStrengthGetter;
        minStrengthGetter = $parse(attrs.minStrength);
        scope.$watch(getMinStrengthValue, function() {
          return ctrl.$$parseAndValidate();
        });
        ctrl.$validators.minStrength = function() {
          var minStrength, pwStrength;
          minStrength = getMinStrengthValue();
          if (ctrl.$viewValue != null) {
            pwStrength = zxcvbn(ctrl.$viewValue);
            return pwStrength.score >= minStrength;
          }
        };
        return getMinStrengthValue = function() {
          var minStrength;
          minStrength = minStrengthGetter(scope);
          if (angular.isObject(minStrength && minStrength.hasOwnProperty("$viewValue"))) {
            minStrength = minStrength.$viewValue;
          }
          return minStrength;
        };
      }
    };
  };

  angular.module("nickel.minStrength", []).directive("minStrength", MinStrengthDirective);

}).call(this);
