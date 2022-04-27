const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('customer creation', () => {
  test('should suceed with valid data', async () => {
    const newCustomer = {
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@doe.com',
      birthDate: '2000-01-01',
    };
    const response = await api
      .post('/customer')
      .send(newCustomer)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(newCustomer.name);
    expect(response.body.surname).toBe(newCustomer.surname);
    expect(response.body.email).toBe(newCustomer.email);
    expect(response.body.birthDate).toBe(newCustomer.birthDate);
  });

  test('should fail with invalid data', async () => {
    const newCustomer = {
      name: 'John',
      surname: 'Doe',
      email: '12234',
      birthDate: '2000-01-01',
    };
    const response = await api
      .post('/customer')
      .send(newCustomer)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(response.body.errors).toBeDefined();
  });
});

describe('single customer retrieval', () => {
  let customer;
  beforeEach(async () => {
    customer = await api.post('/customer').send({
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@doe.com',
      birthDate: '2000-01-01',
    });
  });

  test('should suceed with valid id', async () => {
    const response = await api
      .get(`/customer/${customer.body.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.id).toBe(customer.body.id);
    expect(response.body.name).toBe(customer.body.name);
    expect(response.body.surname).toBe(customer.body.surname);
    expect(response.body.email).toBe(customer.body.email);
    expect(response.body.birthDate).toBe(customer.body.birthDate);
  });

  test('should fail with invalid id', async () => {
    const response = await api
      .get('/customer/1234-1234-1234')
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(response.body.error).toBeDefined();
  });
});
