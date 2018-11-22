// app/routes/note_routes.js

const noteRoutes = require('./note_routes');

module.exports = function(app, db){
	noteRoutes(app, db);
	//other route groups could go here, in the future
};