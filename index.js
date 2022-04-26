require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const validateProduct = require('./middlewares/validateProducts');
const validateSales = require('./middlewares/validateSales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getProducts);

app.get('/products/:id', productsController.getProductById);

app.post('/products',
  validateProduct.valName,
  validateProduct.valQuantity,
  productsController.createProduct);

app.put('/products/:id',
  validateProduct.valName,
  validateProduct.valQuantity,
  productsController.editProduct);

app.delete('/products/:id', productsController.deleteProduct);

app.post('/sales',
  validateSales.valProductIdArray,
  validateSales.valQuantityArray,
  salesController.createSales);

app.get('/sales', salesController.getSales);

app.get('/sales/:id', salesController.getSalesById);

app.put('/sales/:id',
  validateSales.valProductIdArray,
  validateSales.valQuantityArray,
  salesController.updateSales);

app.delete('/sales/:id', salesController.deleteSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
