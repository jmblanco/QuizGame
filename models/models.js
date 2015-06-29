var path = require('path');

// Postgres Format: postgres://user:passwd@host:port/database
// SQLite Format  : sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd, {dialect: protocol, protocol: protocol, port: port, host: host, storage: storage, omitNull: true });

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Importar las categorias de los Quiz
var QuizCategory = sequelize.import(path.join(__dirname, 'quiz_category'));

//Importar la definicion de la tabla Comment
var Comment = sequelize.import(path.join(__dirname, 'comment'));

//Realizamos las relaciones
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//Realizamos los exports
exports.Quiz = Quiz; 
exports.QuizCategory = QuizCategory;
exports.Comment = Comment;

//Inicializacion
sequelize.sync().then(function() {
	Quiz.count().then(function (count) {
		if (count === 0){
			Quiz.create({pregunta: 'Capital de Italia', respuesta: 'roma', categoria: 'GEO'});
			Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'lisboa', categoria: 'GEO'}).then(function(){
				console.log('Preguntas base inicializadas');
			});
		}
	});

	QuizCategory.count().then(function (count) {
		if (count === 0){
			QuizCategory.create({codigo: 'OTR', nombre: 'Otro'});
			QuizCategory.create({codigo: 'HUM', nombre: 'Humanidades'});
			QuizCategory.create({codigo: 'OCI', nombre: 'Ocio'});
			QuizCategory.create({codigo: 'CIE', nombre: 'Ciencia'});
			QuizCategory.create({codigo: 'TEC', nombre: 'Tecnología'});
			QuizCategory.create({codigo: 'GEO', nombre: 'Geografia'});
			QuizCategory.create({codigo: 'DEP', nombre: 'Deportes'}).then(function(){
				console.log('Categorias base inicializadas');
			});
		}
	});
});

