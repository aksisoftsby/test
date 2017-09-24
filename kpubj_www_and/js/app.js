angular.module(angular_name, _appUse)
  .run(function ($ionicPlatform, $ionicSideMenuDelegate) {
    console.log("run");
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      console.log("DEVICE READY");
    });
    document.addEventListener("menubutton", function () {
      $ionicSideMenuDelegate.toggleRight();
    }, false);
  })
  ;