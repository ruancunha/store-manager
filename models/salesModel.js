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

module.exports = {
  getSales,
  getSalesById,
};
