var models = require('../models/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
	models.Comment.find({ where: {id: Number(commentId)}}).then(function(comment){
		if(comment){
			req.comment = comment;
			next();
		}else{
			next(new Error("No existe commentId="+commentId));
		}
	}).catch(function(error){
		next(errors);
	});
};

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// GET /quizes/:quizId/comments/:commitId/publish
exports.publish = function(req, res){
	req.comment.publicado = true;
	console.log("Publish method")
	req.comment.save({fields: ["publicado"]}).then(function(){
		res.redirect('/quizes/'+req.params.quizId);
	}).catch(function(error){next(error)});
}

//POST /quizes/:quizId/comments
exports.create = function(req, res){
	var autor = "";
	if(req.session.user){
		autor = req.session.user.username;
	}else{
		autor = "Anonimo";
	}
	var comment = models.Comment.build( { autor: autor, texto: req.body.comment.texto, publicado: false, QuizId: req.params.quizId });
	console.log(comment);
	comment.validate().then(function(err){
		if(err) {
			res.render('comments/new.ejs', {quizid: req.params.quizId, errors: err.errors});
		}else{
			comment.save().then(function(){
				res.redirect('/quizes/'+req.params.quizId);
			});
		}
	}).catch(function(error){next(error);});
};