//controller sobre a pagina usuario
angular.module('App').controller('UsuarioCtrl',function($scope,$http,$routeParams){
  $scope.mensagem = '';
  $scope.usuario = {};

  if ($routeParams.id_usuario) {
    $http.get('http://localhost:3000/EditaUsuario/' + $routeParams.id_usuario)
    .success(function(usuario){
      $scope.usuario = usuario;
      console.log($scope.usuario);
    })
  };

  $scope.InjetaUsuario = function(){

  };

//requisicao dos tipos de usuarios
  $scope.ConsultaTipo = function(){
    $http.get('http://localhost:3000/ConsultaTipo')//requisicao de tipo de usuario
    .then(function(response){
      $scope.tipos = response.data;
    });
  };

//cadastro de usuario
  $scope.NovoUsuario = function(){
    if($scope.Usuario.$valid){
      $http.post('http://localhost:3000/NovoUsuario',$scope.usuario)
      .then(function(response){
        $scope.mensagem = 'Usuario cadastrado com Sucesso!';
      });
    };
  };

//funcao de atualizacao de usuarios
  var AtualizaUsuario = function(){
    $http.get('http://localhost:3000/ConsultaUsuario')
    .then(function(response){
      $scope.usuarios = response.data;
    });
  };

//atualizar lista de usuarios
  $scope.ConsultaUsuario = function(){
    AtualizaUsuario();
  };

//excluir usuario
  $scope.RemoveUsuario = function(id_usuario){
    var resposta = confirm("Confirmar a exclusão do Usuario?");
    if (resposta == true){
      $http.delete('http://localhost:3000/RemoveUsuario/' + id_usuario)
      .then(function(response){
        alert("Exclusão realizada com sucesso!");
        AtualizaUsuario();
      });
    }
  };

  $scope.AtualizarUsuario = function(id_usuario){
    $location.path("/cadastro");
    var posicao = retornaIndice(id_usuario);
    $scope.produto = $scope.usuarios[posicao];
  }
  // função que retorna a posição de um produto pelo seu código
  function retornaIndice(id_usuario){
    var i;
    for (i=0;i<$scope.usuarios.length;i++){
        if ($scope.usuarios[i].id_usuario == id_usuario){
          return i; // retorna posição do produto desejado
        }
    }
    return -1;
  }

  //verifica
  $scope.verifica = function(username){//inicio funcao
    var i;//declaraçao contador
    $http.get('http://localhost:3000/ConsultaUsuario')//requisicao ao banco
    .then(function(response){
      $scope.usuarios = response.data;//jogando resultado do banco para a variavel $scope.usuarios
      for(i=0;i<$scope.usuarios.length;i++){//inicio de loop para verificar se existe algum username igual
        if($scope.usuarios[i].username == username){
          return alert("Nome de usuario ja utilizado. Insira outro.")//se ja ouver retorna aviso
        }
      }
    });
  };
});
