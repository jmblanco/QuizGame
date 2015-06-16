var express = require('express');
var quizController = require('../controllers/quiz_controller');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});
/* GET author page */
router.get('/author', function(req, res, next) {
  res.render('author', {});
});

/* GET quizes pages */
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;