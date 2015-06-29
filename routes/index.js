var express = require('express');
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// GET author page
router.get('/author', function(req, res, next) {
  res.render('author', {});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

// Login
router.get('/login', sessionController.new);
router.get('/logout', sessionController.destroy);
router.post('/login', sessionController.create);

// Quizes
router.get('/quizes', quizController.index);
router.get('/quizes/search', quizController.search);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);

// Comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);


module.exports = router;
