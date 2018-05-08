const express = require('express');
const debug = require('debug')('index');
const path = require('path');

const app = express();
const port = process.env.PORT || 8009;
const nav = 23;

app.get('/file', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views/index.html'));
});

app.get('/', (req, res) => {
  res.send('Heyyy...');
});

console.log(port + 'asd');
app.listen(port, () => {
  debug('Server started at ' + port + '... Done');
});

const simpleRouter = require("./src/routes/routes")(nav);
app.use('/route', simpleRouter);

const readRouter = require("./src/routes/routes")(nav);
app.use('/readroute', readRouter);