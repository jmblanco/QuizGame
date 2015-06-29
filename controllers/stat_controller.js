var models = require('../models/models.js');

// get stats of quizs
//El número de preguntas
//El número de comentarios totales
//El número medio de comentarios por pregunta
//El número de preguntas sin comentarios
//El número de preguntas con comentarios
exports.stats = function(req, res) {
	
	models.Quiz.findAll({ include: [{ model: models.Comment }] }).then(function (quizes) {
		var numberQuizes = quizes.length;
		var quizesComments = 0;
		var quizesWithoutComments = 0;
		var quizesWithComments = 0;
		for(index in quizes){
			var quizComments = quizes[index].Comments.length;
			quizesComments += quizComments;
			if(quizComments === 0){
				quizesWithoutComments += 1;
			}else{
				quizesWithComments += 1;
			}
		}
		var quizesCommentsRate = Math.round((quizesComments/numberQuizes) * 100) / 100;
		
		res.render('stats/index', { 
			numberQuizes: numberQuizes,
			quizesComments: quizesComments,
			quizesCommentsRate: quizesCommentsRate,
			quizesWithoutComments: quizesWithoutComments,
			quizesWithComments: quizesWithComments
		});
	});
};