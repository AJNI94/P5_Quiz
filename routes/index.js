var express = require('express');
var router = express.Router();
const { models } = require('../models/index.js');
//const Sequelize = require('sequelize');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/credits', function (req, res, next) {
    res.render('credits', { title: 'Credits' , author: 'Alvaro Nieto' });
});

router.get('/quizzes', function (req, res, next) {
    models.quiz.findAll()
        .then(quiz => {
            res.render('quizzes/index.ejs', { title: 'Quizzes', quizzes: quiz });
        })
        .catch(function (error) {
            errorlog(error.message);
        })

});

module.exports = router;