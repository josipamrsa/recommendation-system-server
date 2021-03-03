//----KONFIGURACIJA----//
const express = require('express');
require('express-async-errors');
const app = express();

//----CONTROLLERI----//
const loadDataRouter = require('./controllers/loadData');
const locateRouter = require('./controllers/locateUser');
const recommendRouter = require('./controllers/recommend');

//----MIDDLEWARE----//
app.use(express.json());
app.use(express.static('build'));

//----INICIJALIZACIJA----//
app.use('/api/load', loadDataRouter);
app.use('/api/locate', locateRouter);
app.use('/api/recommendation', recommendRouter);

module.exports = app;