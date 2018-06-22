const express = require('express');
const debug = require('debug')('index');
const path = require('path');
const bodyParser = require('body-parser');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 8009;

app.listen(port, () => {
  debug(`Server started at ${port}... Done`);
  
	const swaggerDefinition = {
		info: {
			title: 'Library APIs',
			version: '1.0',
			description: 'APIs for interacting with the library application.',
		},
		schemes: [ 'http' ],
	};

	const options = {
		swaggerDefinition,
		apis: [
			'./src/app/api/Controllers/bookController.js',
		],
	};

	const swaggerSpec = swaggerJsDoc(options);

	app.use('/api-docs', swaggerUI.serve, (req, res, next) => {
		swaggerUI.setup(swaggerSpec)(req, res);
		next();
	});

	app.get('/swagger.json', function(req, res) {
		res.json(swaggerSpec);
	});
	
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const bookRouter = require('./api/routes/bookRoutes')();

app.use('/api', bookRouter);

module.exports = app;
