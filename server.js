// server.js

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 8000;

// Unfortunately, Express can’t process URL encoded forms on its own. 
// But you did install that body-parser package…
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, (err, database) => {
	const myDB = database.db('nodapi')
	// myDB.collection('forum')  <- define a collection could just be like this
	if(err) return console.log(err)
	require('./app/routes')(app, myDB);

	app.listen(port, () => {
		console.log('We are live on '+port);
	});
});


// main source : https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2