var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var core_use = require('cors');
var pg = require('pg');

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'locacao', //env var: PGDATABASE
  password: 'root', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

/*************************************************************************************************************************************
**************************************************************************************************************************************
                                                          AREA DE INSERÇÕES
**************************************************************************************************************************************
*************************************************************************************************************************************/

/**************************************************** NOVA AREA *********************************************************************/
app.post('/NovaArea', function (req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO areas (nome, descricao ,lote, numero) VALUES ( \''+ req.body.nome + '\',\'' + req.body.descricao + '\',' + req.body.lote + ',' + req.body.numero + ')', function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

/**************************************************** NOVO HORARIO *********************************************************************/
app.post('/NovoHorario', function (req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO reservas (id_usuario,id_area,data_reserva,id_inicio,id_fim) VALUES (' + req.body.usuario + ',' + req.body.area + ',\'' + req.body.data_reserva + '\',' + req.body.inicio + ',' + req.body.fim + ')', function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

/**************************************************** NOVO USUARIO *********************************************************************/
app.post('/NovoUsuario', function(req, res){
  pool.connect(function(err, client, done){
    if(err){
      return console.error('Erro conexao',err);
    }
    client.query('INSERT INTO usuarios (nome,email,username,telefone,lote,numero,id_tipos,senha) VALUES(\'' + req.body.nome + '\',\'' + req.body.email + '\',\'' + req.body.username + '\',' + req.body.telefone +
                ',' + req.body.lote + ',' + req.body.numero + ',' + req.body.tipo + ',' + req.body.senha + ')', function(err,result){
      done();
      if(err){
        return console.error('Erro query',err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows);
    });
  });
});

/**************************************************** NOVO CONVIDADO *******************************************************************/
app.post('/add_convidado', function(req, res){
  pool.connect(function(err, client, done){
    if(err){
      return console.error('Erro conexao',err);
    }
    client.query('INSERT INTO convidados(id_reserva,nome,cpf) VALUES (' + req.body.id_reserva + ',\'' + req.body.nome_convidado + '\',' + req.body.cpf_convidado + ')', function(err,result){
      done();
      if(err){
        return console.error('Erro query',err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows);
    });
  });
});

/*************************************************************************************************************************************
**************************************************************************************************************************************
                                                          AREA DE EXCLUSÕES
**************************************************************************************************************************************
*************************************************************************************************************************************/


/**************************************************** REMOVE USUARIO *****************************************************************/
app.delete('/RemoveUsuario/:id_usuario',function(req,res){
  var codigo = req.params.id_usuario
  pool.connect(function(err,client,done){
    if(err){
      return console.error('Erro conexao',err);
    }
    client.query('DELETE FROM usuarios WHERE id_usuario = ' + codigo, function(err,result){
      done();
      if(err){
        return console.error('Erro query',err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows);
    });
  });
});

/**************************************************** REMOVE AREA *****************************************************************/
app.delete('/RemoveArea/:id_area',function(req,res){
  var id_area = req.params.id_area
  pool.connect(function(err,client,done){
    if(err){
      return console.error('Erro conexao',err);
    }
    client.query('DELETE FROM areas WHERE id_area =' + id_area, function(err,result){
      done();
      if(err){
        return console.error('Erro execusao query',err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows);
    });
  });
});

/**************************************************** REMOVE CONVIDADO *****************************************************************/
app.delete('/RemoveConvidado/:id_convidado',function(req,res){
  var id_convidado = req.params.id_convidado
  pool.connect(function(err,client,done){
    if(err){
      return console.error('Erro conexao',err);
    }
    client.query('DELETE FROM convidados WHERE id_convidado =' + id_convidado, function(err,result){
      done();
      if(err){
        return console.error('Erro execusao query',err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows);
    });
  });
});

/**************************************************** REMOVE RESERVA *****************************************************************/
app.delete('/RemoveDados/:id_reserva',function(req,res){
  var id_reserva = req.params.id_reserva
  pool.connect(function(err,client,done){
    if(err){
      return console.error('Erro conexao',err);
    }
    client.query('DELETE FROM reservas WHERE id_reserva =' + id_reserva, function(err,result){
      done();
      if(err){
        return console.error('Erro execusao query',err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows);
    });
  });
});

/*************************************************************************************************************************************
**************************************************************************************************************************************
                                                          AREA DE UPDATE (FALTA COMEÇAR)
**************************************************************************************************************************************
*************************************************************************************************************************************/

app.get('/EditaUsuario/:id_usuario', function (req, res) {//inicio funcao
  var id = req.params.id_usuario;
  pool.connect(function(err, client, done) {//conecao
	  if(err) {//caso erro
		return console.error('error fetching client from pool', err);//report do erro
  }//caso nao haja erro, inicio da funcao sql
	  client.query('SELECT nome FROM usuarios WHERE id_usuario = ' + id, function(err, result) {
		done();//execucao
		if(err) {//caso erro
		  return console.error('error running query', err);//report do erro
		}
		res.setHeader('Access-Control-Allow-Origin','*');//liberacao para saida de dados
		res.json(result.rows); // servidor retorna a consulta em formato json
		});
	});
});


/*************************************************************************************************************************************
**************************************************************************************************************************************
                                                          AREA DE CONSULTAS
**************************************************************************************************************************************
*************************************************************************************************************************************/


/**************************************************** CONSULTA TODOS OS USUARIOS ********************************************************/
app.get('/ConsultaUsuario', function (req, res) {//inicio funcao
  pool.connect(function(err, client, done) {//conecao
	  if(err) {//caso erro
		return console.error('error fetching client from pool', err);//report do erro
  }//caso nao haja erro, inicio da funcao sql
	  client.query('SELECT u.id_usuario,u.nome,u.username,u.email,u.telefone,t.nome AS nome_tipo,u.lote,u.numero ' +
                 'FROM usuarios u INNER JOIN tipos t on(u.id_tipos = t.id_tipo) ' +
                 'ORDER BY id_usuario', function(err, result) {
		done();//execucao
		if(err) {//caso erro
		  return console.error('error running query', err);//report do erro
		}
		res.setHeader('Access-Control-Allow-Origin','*');//liberacao para saida de dados
		res.json(result.rows); // servidor retorna a consulta em formato json
		});
	});
});


/**************************************************** CONSULTA TODAS AS AREAS *************************************************************/
app.get('/ConsultaAreas', function (req, res) {
  pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT * FROM areas ORDER BY id_area', function(err, result) {
		done();
		if(err) {
		  return console.error('error running query', err);
		}
		res.setHeader('Access-Control-Allow-Origin','*');
		res.json(result.rows); // servidor retorna a consulta em formato json
		});
	});
});

/************************************************* CONSULTA OS TIPOS DE USUARIOS **********************************************************/
app.get('/ConsultaTipo', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT * FROM tipos ORDER BY id_tipo', function(err, result) {
		done();
		if(err) {
		  return console.error('error running query', err);
		}
		res.setHeader('Access-Control-Allow-Origin','*');
		res.json(result.rows); // servidor retorna a consulta em formato json
		});
	});
});

/***************************************************************************************************************************************/
/**************************************************** REVER ESTA QUERY *****************************************************************/
app.get('/convidados', function (req, res) {
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT * FROM convidados WHERE id_reserva = (SELECT MAX(id_reserva) FROM reservas)', function(err, result) {
		done();
		if(err) {
		  return console.error('error running query', err);
		}
		res.setHeader('Access-Control-Allow-Origin','*');
		res.json(result.rows); // servidor retorna a consulta em formato json
		});
	});
});

/**************************************************** REVER ESTA QUERY *****************************************************************/
app.get('/ConsultaDados/:id_reserva',function(req,res){
  var id = req.params.id_reserva;
  pool.connect(function(err,client,done){
    if(err){
      return console.error('Erro conexao',err);
    }
    client.query('SELECT r.id_reserva,u.nome,a.nome AS nome_area, r.data_reserva, h.horario AS inicio,hh.horario ' +
                  'FROM reservas r '+
                  'INNER JOIN usuarios u ON (r.id_usuario = u.id_usuario) '+
                  'INNER JOIN areas a ON (a.id_area = r.id_area) '+
                  'INNER JOIN horarios h ON(h.id_horario = r.id_inicio) '+
                  'INNER JOIN horarios hh ON (hh.id_horario = r.id_fim) '+
                  'WHERE r.id_reserva = '+ id, function(err,result){
      done();
      if(err){
        return console.error('Erro query',err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows);
    });
  });
});

/**************************************************** REVER ESTA QUERY *****************************************************************/
app.get('/ConsultaDados2/:id_reserva',function(req,res){
  var id = req.params.id_reserva;
  pool.connect(function(err,client,done){
    if(err){
      return console.error('Erro conexao',err);
    }
    client.query('SELECT c.nome AS convidado,c.cpf '+
                  'FROM convidados c '+
                  'INNER JOIN reservas r ON (c.id_reserva = r.id_reserva) '+
                  'WHERE r.id_reserva = '+ id, function(err,result){
      done();
      if(err){
        return console.error('Erro query',err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows);
    });
  });
});

/************************************************** CONSULTA DE USUARIO LOGAR *************************************************************/
app.post('/Login',function(req, res){
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT COUNT(*) FROM usuarios WHERE username = \'' + req.body.username + '\' AND senha = ' + req.body.senha, function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

/******************************************** SELECIONAR TODAS AS INFO. DE AREAS **********************************************************/
app.get('/DadosAreas',function(req,res){
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM areas', function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

/****************************************** SELECIONAR TODAS AS INFO. DE USUARIOS **********************************************************/
app.get('/DadosUsuarios',function(req,res){
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM usuarios', function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

/**************************************** SELECIONAR ULTIMA RESERVA PARA ADD CONVIDADOS ****************************************************/
app.get('/id_Reserva',function(req,res){
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query("SELECT id_reserva FROM reservas WHERE id_reserva = (SELECT MAX(id_reserva) FROM reservas)", function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

/******************************************** SELECIONAR HORARIOS NÃO RESERVADOS **********************************************************/
app.post('/DadosHorarios',function(req,res){

  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query(' SELECT h.horario,h.id_horario '+
                 ' FROM horarios h '+
                 ' WHERE NOT EXISTS(SELECT * FROM reservas r '+
            		 ' WHERE r.data_reserva = \'' + req.body.data_reserva +
                 '\' AND r.id_area = ' + req.body.area +
            		 ' AND h.id_horario BETWEEN id_inicio AND id_fim-1)'+
                 ' ORDER BY id_horario', function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});


/******************************************** SELECIONAR RESERVAS DE DIA ATUAL **************************************************************/
app.get('/ReservasAtual',function(req,res){
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT r.id_reserva,u.nome AS nome_usuario,a.nome,r.data_reserva,h.horario AS horario_inicio,hh.horario FROM reservas r INNER JOIN usuarios u ON (u.id_usuario = r.id_usuario)'+
                  'INNER JOIN areas a ON (a.id_area = r.id_area)'+
                  'INNER JOIN horarios h ON (h.id_horario = r.id_inicio)'+
                  'INNER JOIN horarios hh ON (hh.id_horario = r.id_fim)'+
                  'WHERE CURRENT_DATE = r.data_reserva '+
                  'ORDER BY r.data_reserva, r.id_inicio', function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

app.get('/Reservas',function(req,res){
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT r.id_reserva,u.nome AS nome_usuario,a.nome,r.data_reserva,h.horario AS horario_inicio,hh.horario FROM reservas r INNER JOIN usuarios u ON (u.id_usuario = r.id_usuario)'+
                  'INNER JOIN areas a ON (a.id_area = r.id_area)'+
                  'INNER JOIN horarios h ON (h.id_horario = r.id_inicio)'+
                  'INNER JOIN horarios hh ON (hh.id_horario = r.id_fim)'+
                  'ORDER BY r.data_reserva, r.id_inicio', function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
    });
  });
});

app.listen(3000);
