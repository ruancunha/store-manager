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

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsServices.createProduct({ name, quantity });

  if (product.message) {
    return res.status(409).json(product);
  }

  return res.status(201).json(product);
};

const updateProduct = async (req, res) => res.status(200).json({ message: 'falta update' });

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};
