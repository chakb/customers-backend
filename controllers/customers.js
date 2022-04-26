const customersRouter = require('express').Router();

let customers = [];

customersRouter.get('/all', (req, res) => {
  res.status(200).send(customers);
});

module.exports = customersRouter;
