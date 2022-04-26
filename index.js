const express = require('express');
const app = express();
const customersRouter = require('./controllers/customers');

app.use(express.json());

app.use('/customer', customersRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
