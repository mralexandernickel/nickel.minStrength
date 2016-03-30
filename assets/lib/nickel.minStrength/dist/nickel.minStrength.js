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
        scope.$watch(function(attrs){
          console.info("WATCHED")
          ctrl.$$parseAndValidate();
        });
        scope.$watch(getMinStrengthValue, function() {
          console.debug("PARSE AND VALIDATE")
          return ctrl.$$parseAndValidate();
        });
        ctrl.$validators.minStrength = function() {
          var minStrength, pwStrength;
          minStrength = attrs.minStrength;
          if (ctrl.$viewValue != null) {
            pwStrength = zxcvbn(ctrl.$viewValue);
            console.debug("Checking against minimumScore of", minStrength)
            return pwStrength.score >= minStrength;
          }
        };
        getMinStrengthValue = function() {
          console.debug("GET MIN STRENGTH VALUE", attrs.minStrength);
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
