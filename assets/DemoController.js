var DemoController = function($scope, $mdDialog, $filter){
  $scope.closeDialog = function(){
    $mdDialog.hide()
  }
  $scope.password = ""
  $scope.showInfo = function(val,e){
    console.log(val)
    var strength = zxcvbn(val)
    $mdDialog.show(
      $mdDialog
        .alert()
        .title("Information about Password")
        .content("<pre>"+$filter("json")(strength)+"</pre>")
        .targetEvent(e)
        .ok("Close")

    )
  }
}
app.controller("DemoController", DemoController)
