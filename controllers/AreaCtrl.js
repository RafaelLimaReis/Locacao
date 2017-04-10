
//controller sobre a pagina area
angular.module('App').controller('AreaCtrl',function($scope,$http){
  $scope.mensagem = '';
//cadastro de area

  $scope.NovaArea = function(){
    if($scope.Area.$valid){
      $http.post('http://localhost:3000/NovaArea',$scope.area)
      .then(function(response){
        $scope.mensagem = 'Área cadastrada com sucesso!';
      });
    };
  };

  //funcao de atualizacao de Areas
    var AtualizaArea = function(){
      $http.get('http://localhost:3000/ConsultaAreas')
      .then(function(response){
        $scope.areas = response.data;
      });
    };

  //atualizar lista de Areas
    $scope.ConsultaArea = function(){
      AtualizaArea();
    };

    //excluir area
      $scope.RemoveArea = function(id_area){//inicio funcao
        var resposta = confirm("Confirmar a exclusão da area?");//requisicao de confirmacao
        if (resposta == true){//caso seja verdadeiro a requisicao
          $http.delete('http://localhost:3000/RemoveArea/' + id_area)//passando parametros para o banco para ser feito a exclusao
          .then(function(response){
            $scope.mensagem = 'Exclusão realizada com sucesso!';//mensagem de sucesso
            AtualizaArea();//chamada da funcao para atualizar lista de areas
          });
        }
      };
});
