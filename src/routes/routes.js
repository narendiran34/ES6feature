const express = require("express");

const simpleRouter = express.Router();
const readRouter = express.Router();
const mongoClient = require('mongodb').MongoClient;
const debug = require("debug")('index:routes');

const isqs = [
	{
		"type": "OPAC",
		"AUTOTEST": "Y",
		"vendor": "epic",
	},
	{
		"type": "LAB",
		"AUTOTEST": "N",
		"vendor": "RELAY",
	},
	{
		"type": "CHL7",
		"AUTOTEST": "N",
		"vendor": "ORION",
	},
	{
		"type": "OPAC",
		"AUTOTEST": "Y",
		"vendor": "epic",
	},
];

function router(nav) {
	simpleRouter.route('/')
		.get((req,res) => {
			const url = 'mongodb://localhost:27017';
			const dbName = 'NarenDB';
			(async function mongo(){
				let client;
				try {
					client = await mongoClient.connect(url);
					debug('Connected to mongoDB');
					
					const db = client.db(dbName);
					
					const inserted = await db.collection('narenisq').insertMany(isqs);
					res.json(inserted);
				}
				catch (err){
					debug(err.stack);
				}
				client.close();
			}())
	});
	
	return simpleRouter;
}

function read(nav) {
	readRouter.route('/')
		.get((req,res) => {
			const url = 'mongodb://localhost:27017';
			const dbName = 'NarenDB';
			(async function mongo(){
				let client;
				try {
					client = await mongoClient.connect(url);
					debug('Connected to mongoDB');
					
					const db = client.db(dbName);
					
					const items = await db.collection('narenisq');
					const filtereditems = await items.find().toArray();
					res.send(filtereditems);
				}
				catch (err){
					debug(err.stack);
				}
				client.close();
			}())
	});
	
	return readRouter;
}

module.exports = read;
module.exports = router;
