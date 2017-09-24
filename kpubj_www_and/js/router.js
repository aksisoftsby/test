angular.module(angular_name, _appUse)
  .config(function ($stateProvider, $urlRouterProvider) {
    console.log("config");
    $stateProvider
      .state('home', {
        url: "/home",
        abstract: true,
        templateUrl: "template/menu.html"
      })
      .state('home.homemenu', {
        url: "/homemenu",
        views: {
          'menuContent': {
            templateUrl: kpubj_template_dir + "/home.html",
            controller: modul_controller_home
          }
        }
      })
    $urlRouterProvider.otherwise('/home/homemenu');
  })
  