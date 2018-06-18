const express = require('express');
const debug = require('debug')('index');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8009;

app.get('/file', (req, res) => {
  res.sendFile(path.join(__dirname, 'api/views/index.html'));
});

app.get('/', (req, res) => {
  res.send('Heyyy...');
});

app.listen(port, () => {
  debug('Server started at ' + port + '... Done');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const bookRouter = require("./api/routes/bookRoutes")();
app.use('/api', bookRouter);	

module.exports = app;
