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

exports.Quiz = Quiz; //exportar la definicion de la tabla Quiz


sequelize.sync().success(function() {
	Quiz.count().success(function (count) {
		if (count === 0){
			Quiz.create({pregunta: 'Capital de Italia', respuesta: 'roma'});
			Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'lisboa'}).then(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});