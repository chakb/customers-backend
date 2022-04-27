const express = require('express');
const app = express();
const customersRouter = require('./controllers/customers');

app.use(express.json());

app.use('/customer', customersRouter);

module.exports = app;
