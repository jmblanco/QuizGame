//Definicion del modelo de comments

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Comment', { 
		autor: {
			type: DataTypes.STRING,
        	validate: { notEmpty: {msg: "Falta el Autor"}}
		}, 
		texto: {
			type: DataTypes.STRING,
        	validate: { notEmpty: {msg: "Falta el Comentario"}}
		},
		publicado: {
			type: DataTypes.BOOLEAN,
        	defaultValue: false
		}
	});
}
