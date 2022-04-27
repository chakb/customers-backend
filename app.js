const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const customersRouter = require('./controllers/customers');
app.use(express.json());
app.use('/customer', customersRouter);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
