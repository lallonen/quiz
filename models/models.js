var path= require('path');

//Postgres: postgres://user:passwd@host:port/database
//SQLite: sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user	= (url[2]||null);
var pwd		= (url[3]||null);
var protocol= (url[1]||null);
var dialect = (url[1]||null);
var port    = (url[5]||null);
var host	= (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_name,user,pwd,
	{ dialect: protocol,
	  protocol:protocol,
	  port:    port, 
	  host:    host,
	  storage: storage, //solo SQLite
	  omitNull: true    //solo Postgres

	}
);

/*var sequelize = new Sequelize(null,null,null,
						{dialect: "sqlite", storage: "quiz.sqlite"}
					);*/
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;

sequelize.sync().then(function(){
	Quiz.count().then(function (count){
		if(count===0){
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma',
						  tematica: 'otro'
						});
			Quiz.create({ pregunta: 'Capital de España',
						  respuesta: 'Madrid',
						  tematica: 'otro'
						});
			Quiz.create({ pregunta: 'Capital de Rusia',
						  respuesta: 'Moscú',
						  tematica: 'otro'
						});
			Quiz.create({ pregunta: 'Capital de Rumania',
						  respuesta: 'Bucarest',
						  tematica: 'otro'
						});
			Quiz.create({ pregunta: 'Capital de Portugal',
						  respuesta: 'Lisboa',
						  tematica: 'otro'
						})
			.then(function(){console.log('Base de datos inicializada')});
		};
		/*Quiz.destroy({
 			 where: {
 			 	id:{
 			 		$in: [1,2,3,4, 5]	
 			 	}
 			 	//$in: [1, 2]
    			//id: '1'
  			}
		});*/
	});
});