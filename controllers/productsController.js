const productsServices = require('../services/productsServices');

const getProducts = async (_req, res) => {
  const products = await productsServices.getProducts();

  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const products = await productsServices.getProductById(id);

  if (!products) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(products);
};

module.exports = {
  getProducts,
  getProductById,
};
