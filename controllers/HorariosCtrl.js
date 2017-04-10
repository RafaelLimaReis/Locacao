//horarios
angular.module('App').controller('HorariosCtrl',function($scope,$http,$location){
  $scope.mensagem = '';

//requisicao dos tipos de usuarios
  var Dados = function(){
    $http.get('http://localhost:3000/DadosUsuarios')//requisicao dos usuarios
      .then(function(response){
        $scope.usuarios = response.data;
      });
    $http.get('http://localhost:3000/DadosAreas')
      .then(function(response){
        $scope.area = response.data;
      });

    $http.get('http://localhost:3000/Reservas')
      .then(function(response){
        $scope.reservas = response.data;
      });
  };

  $scope.id = function(){
    $http.get('http://localhost:3000/id_Reserva')
      .then(function(response){
        $scope.id_reservas = response.data;
       });
  };

  var atualizaConvidado = function(){
    $http.get('http://localhost:3000/convidados')
      .then(function(response){
        $scope.convidados = response.data;
      })
  };


  $scope.add_convidado = function(){
    console.log($scope.convidado.id_Reserva);
    $http.post('http://localhost:3000/add_convidado',$scope.convidado)
      .then(function(response){
        $scope.mensagem = 'Convidado cadastrado.';
        atualizaConvidado();
      });
  };

  $scope.buscaData = function(){
    $http.post('http://localhost:3000/DadosHorarios',$scope.cadastro)
      .then(function(response){
        $scope.horarios = response.data;
    });
  };
  $scope.ConsultaHorarios = function(){
    Dados();
  };



  $scope.ConsultaHorariosAtual = function(){
    $http.get('http://localhost:3000/ReservasAtual')
      .then(function(response){
        $scope.reservasAtual = response.data;
        if ($scope.reservasAtual.length == 0) {
          $scope.mensagem = 'Não há reservas para hoje.';
        }
      });

  };

  $scope.NovoHorario = function(){
      $http.post('http://localhost:3000/NovoHorario',$scope.cadastro)
        .then(function(response){
          $location.path('/convidados');
          Dados();
        });
  };

  $scope.RemoveHorario = function(id_reserva){
    var resposta = confirm("Confirmar a ação?");
    if (resposta == true){
      $http.delete('http://localhost:3000/RemoveDados/' + id_reserva)
        .then(function(response){
          $scope.mensagem = 'Cancelamento de rezerva com sucesso!';
          Dados();
        });
    }
  };

    $scope.RemoveConvidado = function(id_convidado){
      var resposta = confirm("Confirmar a exclusão da reserva?");
      if (resposta == true){
        $http.delete('http://localhost:3000/RemoveConvidado/' + id_convidado)
          .then(function(response){
            $scope.mensagem = 'Exclusão realizada com sucesso!';
            atualizaConvidado();
          });
      }
    };
});
