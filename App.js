var app = angular.module('App', ['ngRoute','angularUtils.directives.dirPagination','DirFixa'])
.config(function($routeProvider,$locationProvider){
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/',{
      templateUrl:'views/login.html',
      controller:'LoginCtrl'
    })
    .when('/home',{
      templateUrl:'views/home.html',
      controller:'HorariosCtrl'
    })
    .when('/cadastro',{
      templateUrl:'views/cadastro.html',
      controller:'UsuarioCtrl'
    })
    .when('/cadastro/edit/:id_usuario',{
      templateUrl:'views/cadastro.html',
      controller:'UsuarioCtrl'
    })
    .when('/areas',{
      templateUrl:'views/areas.html',
      controller:'AreaCtrl'
    })
    .when('/convidados',{
      templateUrl:'views/convidados.html',
      controller:'HorariosCtrl'
    })
    .when('/dadosReserva',{
      templateUrl:'views/dadoReserva.html',
      controller:'HorariosCtrl'
    })
    .when('/Editusuarios',{
      templateUrl:'views/Editusuarios.html',
      controller:'UsuarioCtrl'
    })
    .when('/Editareas',{
      templateUrl:'views/Editareas.html',
      controller:'AreaCtrl'
    })
    .when('/horarios',{
      templateUrl:'views/horarios.html',
      controller:'HorariosCtrl'
    })
    .when('/visualizaConvidados/:id_reserva',{
      templateUrl:'views/dadoReserva.html',
      controller:'DadosCtrl'
    })
    .otherwise({
      redirectTo:'/'
    });
});
