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

// GET quizes pages
router.get('/login', sessionController.new);
router.get('/logout', sessionController.destroy);

router.get('/quizes', quizController.index);
router.get('/quizes/new', quizController.new);
router.get('/quizes/search', quizController.search);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);

// PUT quizes pages
router.put('/quizes/:quizId(\\d+)', quizController.update);

// DELETE quizes pages
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

// POST quizes pages
router.post('/login', sessionController.create);

router.post('/quizes/create', quizController.create);

router.post('/quizes/:quizId(\\d+)/comments', commentController.create);


module.exports = router;
