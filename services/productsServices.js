const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return products;
};

const getProductById = async (id) => {
  const products = await productsModel.getProductById(id);

  return products;
};

module.exports = {
  getProducts,
  getProductById,
};
