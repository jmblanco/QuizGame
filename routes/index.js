var express = require('express');
var quizController = require('../controllers/quiz_controller');

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
router.get('/quizes', quizController.index);
router.get('/quizes/new', quizController.new);
router.get('/quizes/search', quizController.search);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

// PUT quizes pages
router.put('/quizes/:quizId(\\d+)', quizController.update);

// DELETE quizes pages
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

// POST quizes pages
router.post('/quizes/create', quizController.create);

module.exports = router;
