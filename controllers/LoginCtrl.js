//login
angular.module('App').controller('LoginCtrl',function($scope,$http,$location){

  $scope.mensagem = '';

  $scope.Login = function(){//inicio funcao
    if($scope.Logar.$valid){
      var resposta;//declaracao variavel resposta
      $http.post('http://localhost:3000/Login',$scope.login)//requisicao ao banco para conparacao de parametros
      .then(function(response){
        resposta = response.data[0].count;//jogando quantidade d retorno para variavel
        if(resposta == 0){//caso variavel esteja vazia
          $scope.mensagem = 'Usuario e/ou senha incorreto.';//mensagem de erro
          $scope.login = '';
        }else
        $location.path('/home');//caso haja 1 valor, realocacao para tela principal
      });
    };
  };
});
