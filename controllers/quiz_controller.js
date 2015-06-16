exports.question = function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

exports.answer = function(req, res){
	if (req.query.respuesta.toLowerCase() === 'roma'){
		res.render('quizes/answer', {respuesta: 'Correcta'});
	}else{
		res.render('quizes/answer', {respuesta: 'Incorrecta'});
	}
};
