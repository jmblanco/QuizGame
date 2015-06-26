//Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('QuizCategory', { 
		codigo: {
			type: DataTypes.STRING,
        	validate: { notEmpty: {msg: "Falta el codigo de la categoria"}}
		}, 
		nombre: {
			type: DataTypes.STRING,
        	validate: { notEmpty: {msg: "Falta el nombre de la categoria"}}
		}
	});
}
