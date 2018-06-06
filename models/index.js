const Sequelize = require('sequelize');
const options = { logging: false, operatorsAliases: false };
const sequelize = new Sequelize("sqlite:quizzes.sqlite", options);

sequelize.define('quiz', {

    question: {
        type: Sequelize.STRING,         
        unique: { msg: "ya exite esta pregunta" },
        validate: { notEmpty: { msg: "la pregunta no puede estar vacia" }
        }
    }, answer: { type: Sequelize.STRING, validate: { notEmpty: { msg: "La respuesta no puede estar vacia" } } }
});



sequelize.sync().then(function () {

    sequelize.models.quiz.count()
})

.then(function (count) {
    if (!count) { //Si la tabla quiz esta VACIA!!(count ===0),se inicia con los 4 elementos.    
        return sequelize.models.quiz.bulkCreate([
            { question: "Capital de Italia", answer: "Roma" },
            { question: "Capital de Francia", answer: "París" },
            { question: "Capital de España", answer: "Madrid" },
            { question: "Capital de Portugal", answer: "Lisboa" }]);
    }
    })
  .catch(function (error) { console.log(error); });

module.exports = sequelize;//Exporta el objeto de acceso a la BBDD y a sus tablas(models.js).

