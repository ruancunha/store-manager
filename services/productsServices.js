const productsModel = require('../models/productsModel');

const getProductByName = async (name) => {
  const product = await productsModel.getProductByName(name);
  if (product) return true;
  return false;
};

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return products;
};

const getProductById = async (id) => {
  const products = await productsModel.getProductById(id);

  return products;
};

const createProduct = async ({ name, quantity }) => {
  const allProducts = await productsModel.getProducts();
  const validate = allProducts.some((i) => i.name === name);
  // const checkSameName = getProductByName(name);

  if (validate) {
    return { message: 'Product already exists' };
  }

  const product = await productsModel.createProduct({ name, quantity });

  return product;
};

const editProduct = async (id, name, quantity) => {
  const product = await getProductById(id);

  if (!product) return { message: 'Product not found' };

  const updateProduct = await productsModel.editProduct(id, name, quantity);

  return updateProduct;
};

const deleteProduct = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product) return { message: 'Product not found' };

  return productsModel.deleteProduct(id);
};

module.exports = {
  getProductByName,
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
};
