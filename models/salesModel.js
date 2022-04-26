const connection = require('./connection');

const serialize = (salesData) => {
  const result = {
    saleId: salesData.sale_id,
    date: salesData.date,
    productId: salesData.product_id,
    quantity: salesData.quantity,
  };
  return result;
};

const getSales = async () => {
  const query = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id`;

  const [sales] = await connection.execute(query);
  return sales.map(serialize);
};

const getSalesById = async (id) => {
  const query = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON s.id = sp.sale_id
  WHERE id = ?`;

  const [sales] = await connection.execute(query, [id]);

  if (sales.length === 0) return null;

  return sales.map((sale) => {
    const { date, productId, quantity } = serialize(sale);
    return {
      date,
      productId,
      quantity,
    };
  });
};

const createSales = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);

  return insertId;
};

const createSalesProducts = async (salesId, productId, quantity) => {
  // console.log("Entrou no model createSales");
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  await connection.execute(query, [salesId, productId, quantity]);
};

const updateSales = async (quantity, saleId, productId) => {
  const query = `UPDATE StoreManager.sales_products
  SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(query, [quantity, saleId, productId]);

  return true;
};

module.exports = {
  getSales,
  getSalesById,
  createSales,
  createSalesProducts,
  updateSales,
};
