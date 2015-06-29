var express = require('express');
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statsController = require('../controllers/stat_controller');

var router = express.Router();

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

// GET home page
router.get('/', sessionController.autologout, function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// GET author page
router.get('/author', sessionController.autologout, function(req, res, next) {
  res.render('author', {});
});

// Login
router.get('/login', sessionController.new);
router.get('/logout', sessionController.destroy);
router.post('/login', sessionController.create);

// Quizes
router.get('/quizes', sessionController.autologout, quizController.index);
router.get('/quizes/search', sessionController.autologout, quizController.search);
router.get('/quizes/:quizId(\\d+)', sessionController.autologout, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.autologout, quizController.answer);
router.get('/quizes/new', sessionController.autologout, sessionController.loginRequired, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.autologout, sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.autologout, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.autologout, sessionController.loginRequired, quizController.destroy);
router.post('/quizes/create', sessionController.autologout, sessionController.loginRequired, quizController.create);

// Comments
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.autologout, commentController.new);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.autologout, sessionController.loginRequired, commentController.publish);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.autologout, commentController.create);

//Stats
router.get('/quizes/statistics', sessionController.autologout, statsController.stats);

module.exports = router;
