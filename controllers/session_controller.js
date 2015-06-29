var MIN_INACTIVE_SESSION = 2;

//MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
};

//MW de autologout
exports.autologout = function(req, res, next){
	if(req.session.user){
		var currentDate = new Date();
		var lastActionDate = new Date(req.session.lastDate);
		console.log("Session inactivity control");
		console.log("Last Action Date: " + lastActionDate);
		console.log("Current Date    : " + currentDate);
		if(minutesDiff(lastActionDate,currentDate) > MIN_INACTIVE_SESSION) {
			console.log("Session inactivity detected, reset session...")
			delete req.session.user;
			delete req.session.lastDate;
			res.redirect(req.session.redir.toString());
		} else{
			req.session.lastDate = new Date();
			next();	
		}
	}else{
		next();	
	}
	
};
function minutesDiff(init, end) {
	console.log("Init Date: " + init);
	console.log("End Date : " + end);
	var minutes = (end-init)/(1000*60);
	console.log("Minutes Diff ["+minutes+"]")
    return minutes;
}

// GET /login Formulario
exports.new = function(req, res){
	console.log("Getting log form")
	var errors = req.session.errors || {};
	req.errors = {};
	
	res.render('sessions/new', {errors: errors});
};

// POST /login creacion de sesion
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;

	console.log("Creating new session for user ["+login+"]");

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user) {
		if(error){
			req.session.errors = [{ "message": ''+error}];
			res.redirect("/login");
			return;
		}

		req.session.user = { id: user.id, username: user.username };
		req.session.lastDate = new Date();
		res.redirect(req.session.redir.toString());
	});
};

// DELETE /logout
exports.destroy = function(req, res){
	console.log("Destroying session for user ["+req.session.user+"]");
	delete req.session.user;
	delete req.session.lastDate;
	res.redirect(req.session.redir.toString());
};