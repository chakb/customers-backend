const customersRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

let customers = [];

customersRouter.get('/all', (req, res) => {
  res.status(200).send(customers);
});

customersRouter.post(
  '/',
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('surname').isLength({ min: 1 }).withMessage('Surname is required'),
  check('email').isEmail().withMessage('Email is required'),
  check('birthDate').isISO8601().withMessage('Birth date is required'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customer = {
      id: uuidv4(),
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      birthDate: req.body.birthDate,
    };

    customers.push(customer);
    res.status(201).send(customer);
  },
);

module.exports = customersRouter;
