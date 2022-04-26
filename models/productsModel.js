const connection = require('./connection');

const getProductByName = async (name) => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE name = ?';
  const [products] = await connection.execute(query, [name]);

  if (products.length === 0) return null;

  return products[0];
};

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

const createProduct = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)', [name, quantity],
  );

  return { id: insertId, name, quantity };
};

const editProduct = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);

  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);

  return true;
};

module.exports = {
  getProductByName,
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
};
