// app/routes/note_routes.js
// this is in mongo way
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
	const forumCol = db.collection('forum');

	app.get('/', function (req, res) { //dashboard
		console.log("Dashboard loaded")
	});

	app.get('/forum', (req, res) => { //get all
		forumCol.find({}).toArray(function(err, items){
			if(err) throw err;
			res.send(items);
		});
	});

	app.get('/forum/:id', (req, res) => { //get by id
		const id = req.params.id;
		const details = {'_id': new ObjectID(id)};
		forumCol.findOne(details, (err, item) => {
			if(err) throw err;
			res.send(item);
		});
	});

	app.post('/forum', (req, res) => { //create
		const chat = {text: req.body.body, created_by: req.body.created_by};
		forumCol.insertOne(chat, (err, results) => {
			if(err) throw err;
			res.send(results.ops[0]);
		});
	});

	app.delete('/forum/:id', (req, res) => { //delete by id
		const id = req.params.id;
		const details = {'_id': new ObjectID(id)};//or [logId] if it not working
		forumCol.deleteOne(details, (err, item) => {
			if(err) throw err;				
			res.send('['+id+'] : chat deleted');
		});
	});

	app.put('/forum/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id)};
		const chat = {text: req.body.body, created_by: req.body.created_by};
		forumCol.update(details, chat, (err, results) => {
			if(err) throw err;
			res.send(chat);
		});
	});
};