
var models = require('../models/models.js');
var url = require('url');
//GET /QUIZES/QUESTION

/*exports.question = function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};*/
//Autoload -factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{next(new Error('No existe quizId='+quizId));}
		}
	).catch(function(error) {next(error);});
};

//GET /quizes
/*exports.index = function(req,res){
		var stringbuscar='';
		var query= url.parse(req.url,true).query;
		if (query.search === undefined){
			stringbuscar ='%';	
		}else{
			stringbuscar = '%'+query.search.replace(' ', '%')+'%';
		}
		models.Quiz.findAll({where:{pregunta: {$like: stringbuscar }},order:{'pregunta', 'ASC'}}).then(
			function(quizes){
				res.render('quizes/index.ejs',{quizes : quizes, param: stringbuscar});
			}
			).catch(function(error){next(error);})
};*/
exports.index = function(req,res){
		var stringbuscar='';
		var query= url.parse(req.url,true).query;
		if (query.search === undefined){
			stringbuscar ='%';	
		}else{
			var re = / /gi;
			stringbuscar = '%'+query.search.replace(re, '%')+'%';
		}
		models.Quiz.findAll({where:{pregunta: {$like: stringbuscar }},order:'pregunta ASC'}).then(
			function(quizes){
				res.render('quizes/index.ejs',{quizes : quizes, errors: []});
			}
			).catch(function(error){next(error);})
};

//GET /quizes/:id
exports.show = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz : req.quiz, errors: []});
	})
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta:resultado, errors: []});
		
};

exports.new = function(req,res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta:"Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});	
};

exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz
	.validate()
	.then(
		function(err){
			if (err){
				res.render('quizes/new', {quiz:quiz,errors: err.errors});
			}else{
				quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){ res.redirect('/quizes')})
			}
		}
	);			
};


/*
//GET /QUIZES/ANSWER
exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: 'Correcto'});
		}else{
			res.render('quizes/answer', {respuesta:'Incorrecto'});
		}
	})
	
};*/

//GET /AUTHOR
exports.author = function(req,res){
	res.render('author', {nombre: 'Lallonen M. D.'});
};