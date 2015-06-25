var models = require('../models/models.js');

// Autoload - factoriza el codigo si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error('No existe el quizId='+quizId))
		}
	});
};

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function (quizes) {
		res.render('quizes/index', {quizes: quizes});	
	}).catch(function(error) { next(error);});
};

// GET /quizes/search
exports.search = function(req, res){
	var search = "%"+req.query.search.toLowerCase().replace(' ','%')+"%";
	console.log("Searching for term ["+search+"]")
		models.Quiz.findAll({where:["LOWER(pregunta) like ?", search],order: "pregunta ASC"}).then(function (quizes){
			res.render('quizes/search', {quizes: quizes});	
	}).catch(function(error) { next(error);});
};

// GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz});	
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado;
	if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()){
		resultado = 'Correcta';
	}else{
		resultado = 'Incorrecta';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};
