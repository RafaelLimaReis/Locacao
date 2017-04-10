angular.module('App').controller('DadosCtrl',function($scope,$http,$routeParams){
  $scope.mensagem = '';

      $scope.ConsultaDados = function(){
          $http.get('http://localhost:3000/ConsultaDados/'+$routeParams.id_reserva)
           .then(function(response){
             $scope.dados = response.data;
             console.log($scope.dados);
           });
           $http.get('http://localhost:3000/ConsultaDados2/'+$routeParams.id_reserva)
            .then(function(response){
              $scope.dados2 = response.data;
              if ($scope.dados2.length == 0) {
                $scope.mensagem = 'Não há convidados para este horario.';
              }
            });
        };
});
