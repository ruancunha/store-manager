const connection = require('./connection');

const getProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const getProductById = async (id) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );

  if (products.length === 0) return null;

  return products[0];
};

module.exports = {
  getProducts,
  getProductById,
};
