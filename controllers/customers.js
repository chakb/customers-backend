const customersRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

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

customersRouter.get('/:id', (req, res) => {
  if (!uuidValidate(req.params.id)) {
    return res.status(400).send({ error: 'Invalid id' });
  }
  const customer = customers.find((c) => c.id === req.params.id);
  if (!customer) {
    return res.status(204).send({});
  }
  res.status(200).send(customer);
});

customersRouter.put(
  '/:id',
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('surname').isLength({ min: 1 }).withMessage('Surname is required'),
  check('email').isEmail().withMessage('Email is required'),
  check('birthDate').isISO8601().withMessage('Birth date is required'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!uuidValidate(req.params.id)) {
      return res.status(400).send({ error: 'Invalid id' });
    }
    const customer = customers.find((c) => c.id === req.params.id);
    if (!customer) {
      return res.status(400).send({ error: 'Customer could not be updated' });
    }
    customer.name = req.body.name;
    customer.surname = req.body.surname;
    customer.email = req.body.email;
    customer.birthDate = req.body.birthDate;
    res.status(200).send(customer);
  },
);

customersRouter.delete('/:id', (req, res) => {
  if (!uuidValidate(req.params.id)) {
    return res.status(400).send({ error: 'Invalid id' });
  }
  const customer = customers.find((c) => c.id === req.params.id);
  if (!customer) {
    return res.status(400).send({ error: 'Customer could not be deleted' });
  }
  customers = customers.filter((c) => c.id !== req.params.id);
  res.status(200).send(customer);
});

module.exports = customersRouter;
