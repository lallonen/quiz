
//GET /QUIZES/QUESTION

exports.question = function(req,res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};


//GET /QUIZES/ANSWER

exports.answer = function(req, res){
	if(req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto'});
	}else{
		res.render('quizes/answer', {respuesta:'Incorrecto'});
	}
};

//GET /AUTHOR
exports.author = function(req,res){
	res.render('author', {nombre: 'Lallonen M. D.'});
};